import React from 'react'
import { Route, Switch } from 'react-router-dom'
import IO from 'socket.io-client'

import GSheet from '../picosheet'

import Header from '../components/header'
import FechaActualizacion from '../components/fecha-actualizacion'
import Cambios from '../components/cambios'
import Links from '../components/links'
import Footer from '../components/footer'

import Senators from './senators'
import Home from './home'

import { VOTE_TYPE, UPDATE_TIMEOUT, STORAGE_KEYS, SHEET_IDS, SOCKET_HOST } from '../constants'

let store = localStorage
if (typeof store === "undefined" || store === null) {
  const LocalStorage = import('node-localstorage').LocalStorage
  store = new LocalStorage('./scratch');
}
/*
const _setItem = (key, value) => {
  console.error('setItem', key, value)
  store.setItem(key, value)
}
*/
const processVotes = (data) => data.reduce((votes, p) => {
  if (p.PosicionCON_MODIF === VOTE_TYPE.AFAVOR) { votes.aFavor++ }
  else if (p.PosicionCON_MODIF === VOTE_TYPE.CONTRA) { votes.enContra++ }
  else if (p.PosicionCON_MODIF === VOTE_TYPE.NOCONF) { votes.noConfirmado++ }
  else if (p.PosicionCON_MODIF === VOTE_TYPE.ABSTEN) { votes.seAbstiene++ }
  else { console.error('no data', p) }

  return votes
}, {
  aFavor: 0,
  enContra: 0,
  noConfirmado: 0,
  seAbstiene: 0
})

const diffVotes = (current, previous) => current.reduce((changed, p, i) => {
  if (!previous || !previous.length) { return [] }

  if (p.PosicionCON_MODIF !== previous[i].PosicionCON_MODIF) {
    changed.push({
      i,
      name: p.Senador,
      from: previous[i].PosicionCON_MODIF,
      to: p.PosicionCON_MODIF,
      timestamp: Date.now()
    })
  }

  return changed
}, [])

const processState = ({ votes, ...rest }) => ({
  votos: [
    {
      'titulo': 'A Favor',
      'votos': votes.aFavor,
      'color': 'afavor'
    },
    {
      'titulo': 'En Contra',
      'votos': votes.enContra,
      'color': 'encontra'
    },
    {
      'titulo': 'No confirmado',
      'votos': votes.noConfirmado,
      'color': 'noconfirmados'
    },
    {
      'titulo': 'Se Abstiene',
      'votos': votes.seAbstiene,
      'color': 'abstenciones'
    }
  ],
  fecha: Date.now(),
  ...rest
})

const arrayEqual = (a, b) => {
  if (!a || !b || !a.length || (a.length !== b.length)) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.setupSocketIO()

    this.previous = JSON.parse(store.getItem(STORAGE_KEYS.SENATORS) || '[]')
    this.allChanges = JSON.parse(store.getItem(STORAGE_KEYS.CHANGED) || '[]')
    this.checksum = store.getItem(STORAGE_KEYS.CHECKSUM)

    if (! this.previous.length) {
      console.error("FULL REFRESH BURNING DATA")
      GSheet(SHEET_IDS.ALL, 0, 200).then(this.refresh.bind(this))
      this.state = {
      }
    } else {
      this.state = processState({
        votes: processVotes(this.previous),
        previous: this.previous,
        changed: [],
        loading: true,
        broadcasts: []
      })
    }

    this.update()
        .then(refreshed => refreshed || this.refresh(this.previous))
  }

  setupSocketIO() {
    this.socket = IO(SOCKET_HOST)
    this.socket.on('connect', () => {
      console.error('connected to Socket.IO')
      this.socket.on('tweet', msg => {
        console.error('got tweet from Socket.IO')
        if (! msg.match('#poroteo')) return
        this.setState(state => ({
          broadcasts: [...state.broadcasts, msg]
        }))
      })
    })
  }

  scheduleUpdate() {
    setTimeout(this.update.bind(this), UPDATE_TIMEOUT)
  }

  update() {
    return GSheet(SHEET_IDS.RESULTS, 0, 200).then(
      ([results]) => {
        if (this.checksum !== results.checksum) {
          this.checksum = results.checksum
          this.setState(processState({votes: results}))
          GSheet(SHEET_IDS.VOTES, 0, 200)
              .then(this.refresh.bind(this))
        } else {
          this.setState({loading: false})
          this.scheduleUpdate()
          return false
        }
      }
    )
  }

  refresh (current) {
    console.error('refreshing', current)
    const { previous, allChanges } = this
    const senators = current.map((s, i) => ({
      changes: [{timestamp: Date.now(), to: s.PosicionCON_MODIF}],
      ...previous[i],
      ...s
    }))
    const changed = diffVotes(current, previous)
    const [lastChanged] = allChanges.slice(-1)

    if (changed.length && !arrayEqual(changed, lastChanged)) {
      allChanges.push({changes: changed, time: Date.now()})
      store.setItem(STORAGE_KEYS.CHANGED, JSON.stringify(allChanges))
      changed.forEach(c => senators[c.i].changes.push(c))
    }

    store.setItem(STORAGE_KEYS.SENATORS, JSON.stringify(senators))
    store.setItem(STORAGE_KEYS.CHECKSUM, this.checksum)

    this.setState(state => processState({
      votes: processVotes(current),
      loading: false,
      senators,
      changed
    }))

    this.scheduleUpdate()
    this.previous = current
    return true
  }

  render () {
    const { votos = [], senators = [], changed = [], broadcasts = [], fecha, loading} = this.state
    return (
      <div className='container'>
          { loading && <p>Cargando...</p>}
          {broadcasts.length ? <div>{broadcasts.slice(-1)}</div> : null}
        <Header />
        <Switch>
          <Route path={`/senators/by-vote/:vote`} render={props => (
            <Senators senators={senators} {...props} />
          )} />
          <Route render={props => (
            <Home votos={votos} {...props} />
          )} />
        </Switch>

        {fecha &&
        <FechaActualizacion fecha={fecha} />
        }
        <Cambios changed={changed.map(c => senators[c.i])} />
        <Links />
        <Footer />
        <style>{`
          .container {
                      height: 100vh;
                      flex-wrap: wrap;
                      align-items: space-between;
                      justify-content: center;
                      display:flex;
          }
          `}
        </style>
      </div>
    )
  }
}
