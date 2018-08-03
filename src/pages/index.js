import React from 'react'
import LocalForage from 'localforage'
import { Route, Switch } from 'react-router-dom'

import GSheet from '../picosheet'

import Header from '../components/header'
import FechaActualizacion from '../components/fecha-actualizacion'
import Cambios from '../components/cambios'
import Links from '../components/links'
import Footer from '../components/footer'

import Senators from './senators'
import Home from './home'

import { VOTE_TYPE, SENATORS_KEY, CHANGED_KEY, SHEET_ID } from '../constants'

const store = LocalForage.createInstance({
  name: 'poroteo'
})

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
      'color': 'tarjeta-afavor'
    },
    {
      'titulo': 'En Contra',
      'votos': votes.enContra,
      'color': 'tarjeta-encontra'
    },
    {
      'titulo': 'No confirmado',
      'votos': votes.noConfirmado,
      'color': 'tarjeta-noconfirmados'
    },
    {
      'titulo': 'Se Abstiene',
      'votos': votes.seAbstiene,
      'color': 'tarjeta-abstenciones'
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
    this.state = {

    }
    this.update()
  }

  update () {
    Promise.all([
      GSheet(SHEET_ID, 0, 200),
      store.getItem(SENATORS_KEY),
      store.getItem(CHANGED_KEY)
    ]).then(([current, previous, allChanges ]) => {
      allChanges = allChanges || []
      previous = previous || []
      const senators = current.map((s, i) => ({
        changes: [{timestamp: Date.now(), to: s.PosicionCON_MODIF}],
        ...previous[i],
        ...s
      }))
      const changed = diffVotes(current, previous)
      const [lastChanged] = allChanges.slice(-1)

      if (changed.length && !arrayEqual(changed, lastChanged)) {
        allChanges.push({changes: changed, time: Date.now()})
        store.setItem(CHANGED_KEY, allChanges)
        changed.forEach(c => senators[c.i].changes.push(c))
      }

      store.setItem(SENATORS_KEY, senators)

      this.setState(state => processState({
        votes: processVotes(current),
        senators,
        changed
      }))
    })
  }

  render () {
    const { votos, senators, changed, fecha } = this.state
    if (!votos) return <p>Cargando…</p>
    return (
      <div className='container'>

        <Header />
        <Switch>
          <Route path={`/${SENATORS_KEY}/by-vote/:vote`} render={props => (
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
