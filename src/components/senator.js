import React from 'react'

import ago from '../ago'

import SID from '../senadores.json'
import { VOTE_CLASS } from '../constants'

const Change = ({timestamp, from, to, notime}) => (
  <li style={{display: 'block', position: 'absolute', top: '1px', right: '0.5em'}}>
    { notime || <span>@ {ago(timestamp)}</span> }
    <span className={`voto ${VOTE_CLASS[to]}`} style={{borderRadius: '0 0 0.5em 0.5em'}}>{to}</span>
  </li>
)

const MiniSenator = ({toggle, Senador, changes}) => (
  <div onClick={toggle} style={{position: 'relative'}}>
      <h2 style={{display: 'inline-block'}}>{Senador}</h2>
      <ul style={{display: 'inline-block'}}>
          {changes.map((change, i) =>
            <Change key={i} {...change} notime={i === changes.length - 1}/>
          ).slice(0, 4)}
      </ul>
  </div>
)

const SenatorDetails = ({...s}) => {
  const name = s.Senador.split(', ')
  const id = SID[`${name[1]} ${name[0]}`]
  const img = s.Senador === 'MICHETTI, MARTA GABRIELA'
    ? 'http://www.senado.gov.ar/adjunto/autoridadesCamara/11'
    : `http://www.senado.gov.ar/bundles/senadosenadores/images/fsenaG/${id}.png`

  return (
    <div style={{display: 'flex', flexFlow: 'row wrap'}}>
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
      <div key={props.Senador} style={{
        padding: '1em',
        paddingTop: '0',
        margin: '1em',
        borderRadius: '1em',
        backgroundColor: 'lightgrey',
        flex: '35vw 0'
      }}>
        <MiniSenator {...props} />
        {mini || <SenatorDetails {...props} />}
      </div>
    )
  }
}
