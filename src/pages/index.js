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

import { VOTE_TYPE, SENATORS_KEY, SHEET_ID } from '../constants'

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
  if (!previous) { return [] }

  if (p.PosicionCON_MODIF !== previous[i].PosicionCON_MODIF) {
    changed.push({
      name: p.Senador,
      from: previous[i].PosicionCON_MODIF,
      to: p.PosicionCON_MODIF,
      changed: Date.now()
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
      store.getItem(SENATORS_KEY)
    ]).then(([current, previous]) => {
      store.setItem(SENATORS_KEY, current)
      this.setState(state => processState({
        votes: processVotes(current),
        changed: diffVotes(current, previous),
        senators: current
      }))
    })
  }

  render () {
    const { votos = [], senators = [] } = this.state
    return (
      <div className='container'>

        <Header />
        <Switch>
            <Route path={`/${SENATORS_KEY}/:vote`} render={props => (
                <Senators senators={senators} {...props} />
            )} />
            <Route render={props => (
                <Home votos={votos} {...props} />
            )} />
        </Switch>

        {this.state.fecha &&
        <FechaActualizacion fecha={this.state.fecha} />
        }
        <Cambios changed={this.state.changed} />
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
