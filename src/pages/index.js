import React from 'react'

import { Route, Switch, Link } from 'react-router-dom'

import Header from '../components/header'
import Tarjeta from '../components/tarjeta'
import FechaActualizacion from '../components/fecha-actualizacion'
import Cambios from '../components/cambios'
import Links from '../components/links'
import Footer from '../components/footer'
import GSheet from '../picosheet'
import LocalForage from 'localforage'

import SID from '../senadores.json'

import { VOTE_TYPE, VOTE_CLASS, SENATORS_KEY } from '../constants'

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
      GSheet('143fmK1J9Lj9z2gc2EuCyzy9b5d72a32_N0GDveKMrvo', 0, 200),
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
    console.error('this state', this.state)
    return (
      <div className='container'>
        <Header />
        <Switch>
          <Route path={`/${SENATORS_KEY}/:vote`} render={({match}) => (
            senators.filter(s => (s.PosicionCON_MODIF === match.params.vote))
              .map(s => {
                console.error(match)
                const name = s.Senador.split(', ')
                const id = SID[`${name[1]} ${name[0]}`]

                return (
                  <div>
                    <img src={`http://www.senado.gov.ar/bundles/senadosenadores/images/fsenaG/${id}.png`} />
                    <div>
                      <h2>{s.Senador}</h2>
                      <ul>
                        <li>partido {s['PARTIDO POR EL QUE INGRESÓ']}</li>
                        <li>voto {s.PosicionCON_MODIF}</li>
                        <li>sexo {s.sexo}</li>
                        <li>estado civil {s.estadocivil}</li>
                        <li>religion {s.religion}</li>
                      </ul>
                    </div>
                  </div>
                )
              })

          )} />
          <Route render={props => (
            <div className='fila'>
              {votos.map((voto, i) => <Link to={`/${SENATORS_KEY}/${voto.titulo}`}>
                <Tarjeta posicion={voto} />
                <div className='divisor' />
              </Link>
              )}
            </div>

          )} />
        </Switch>

        {this.state.fecha &&
        <FechaActualizacion fecha={this.state.fecha} />
        }
        <Cambios changed={this.state.changed} />
        <Links />
        <Footer />
        <style jsx>{`
          .container {
                      height: 100vh;
                      flex-wrap: wrap;
                      align-items: space-between;
                      justify-content: center;
                      display:flex;
                      }
          .fila {
                 margin: auto;
                 width: 90%;
                 display: flex;
                 flex-direction: row;
                 justify-content: space-around;
                 align-items: flex-start;
                 margin-top: 20px;
                 margin-bottom: 35px;
          }
          .fila a {
               color: black;
          }
          @media (max-width: 767px) {
               .fila {
                 display: flex;
                 flex-wrap: wrap;
                }
                .fila a {
                   flex: 0 1;
                }
          }
          .divisor {
                    width:100%;
                    min-height:10px;
                    }
            `}
        </style>
      </div>
    )
  }
}
