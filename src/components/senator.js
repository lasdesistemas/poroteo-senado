import React from 'react'

import ago from '../ago'

import SID from '../senadores.json'
import { VOTE_CLASS } from '../constants'

const Change = ({timestamp, from, to, notime}) => (
  <ul>
    { notime || <span>@ {ago(timestamp)}</span> }
    <span className={`voto ${VOTE_CLASS[to]}`} style={{borderRadius: '0 0 0.5em 0.5em'}}>{to}</span>
  </ul>
)

const MiniSenator = ({toggle, Senador, changes}) => (
  <div onClick={toggle}>
      <h2>{Senador}</h2>
      <ul>
          {changes.map((change, i) =>
            <Change key={i} {...change} notime={i === changes.length - 1}/>
          ).slice(0, 4)}
      </ul>
  </div>
)

const FullSenator = ({...s}) => {
  const name = s.Senador.split(', ')
  const id = SID[`${name[1]} ${name[0]}`]
  const img = s.Senador === 'MICHETTI, MARTA GABRIELA'
    ? 'http://www.senado.gov.ar/adjunto/autoridadesCamara/11'
    : `http://www.senado.gov.ar/bundles/senadosenadores/images/fsenaG/${id}.png`

  return (
    <div key={s.Senador}>
      <MiniSenator {...s} />
      <div>
        <img src={img} alt={s.Senador} />
        <ul>
          <li>partido {s['PARTIDO POR EL QUE INGRESÓ']}</li>
          <li>sexo {s.sexo}</li>
          <li>estado civil {s.estadocivil}</li>
          <li>religion {s.religion}</li>
        </ul>
      </div>
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

    return mini ? <MiniSenator {...props} /> : <FullSenator {...props} />
  }
}
