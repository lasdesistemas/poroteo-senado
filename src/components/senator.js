import React from 'react'

import ago from '../ago'

import SID from '../senadores.json'
import { VOTE_CLASS } from '../constants'

const Change = ({to}) => (
  <span className={`voto ${VOTE_CLASS[to]}`}>{to}</span>
)

const Changes = ({changes}) => {
  const to = changes[length - 1]
  if (!changes || changes.length < 2) return <Change {...to} />

  const length = changes.length
  const from = changes[length - 2]

  return (
    <span>
      cambió de <Change {...from} /> a <Change {...to} /> @{ago(to.timestamp)}
    </span>
  )
}

const MiniSenator = ({toggle, Senador, changes}) => {
  return (
    <div onClick={toggle} className='senator'>
      <h2>{Senador}</h2>
      <Changes changes={changes} />
    </div>
  )
}

const SenatorDetails = ({...s}) => {
  const name = s.Senador.split(', ')
  const id = SID[`${name[1]} ${name[0]}`]
  const img = s.Senador === 'MICHETTI, MARTA GABRIELA'
    ? 'http://www.senado.gov.ar/adjunto/autoridadesCamara/11'
    : `http://www.senado.gov.ar/bundles/senadosenadores/images/fsenaG/${id}.png`

  return (
    <div style={{display: 'flex', flexFlow: 'row'}}>
      <img src={img} alt={s.Senador} />
      <ul>
        <li>partido {s['PARTIDO POR EL QUE INGRESÓ']}</li>
        <li>sexo {s.sexo}</li>
        <li>estado civil {s.estadocivil}</li>
        <li>religion {s.religion}</li>
      </ul>
    </div>
  )
}

export default class Senator extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {...props}
  }

  render () {
    const { mini } = this.state
    const props = {
      ...this.props,
      toggle: (e) => {
        e.preventDefault()
        this.setState(state => ({mini: !state.mini}))
      }
    }

    if (!props.Senador) {
      return <div key='not found'>
          Senador no encontrado
      </div>
    }

    return (
      <div key={props.Senador} className='senador'>
        <MiniSenator {...props} />
        {mini || <SenatorDetails {...props} />}
        <style>{`
              .senador {
                  padding: 0 1em;
                  margin: 1em;
                  background: lightgrey;
                  flex: 35vw 0;
              }

              @media (max-width: 768px) {
                  .senador {
                      margin: 0.2em 0;
                      flex: 100vw 0;
                  }
              }
            `}
        </style>
      </div>
    )
  }
}
