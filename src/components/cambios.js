import React from 'react'
import { VOTE_CLASS } from '../constants'

const Cambio = ({ changed }) => (
  <div>
    <p>
          Desde la ultima actualización <span>{changed.length} senadores</span> cambiaron de opinion
    </p>
    <ul>
      { changed.map(({name, from, to}) => (
        <li key={name}>
          <span className='senador'>{name}</span> de <span className={`voto ${VOTE_CLASS[from]}`}>{from}</span> a <span className={`voto ${VOTE_CLASS[to]}`}>{to}</span>
        </li>
      ))}
    </ul>
    <style>{`
        li {
		display: block;
	}
        .voto {
              padding: 0.1em 0.3em;
              border-radius: 0.3em;
        }
        `}
    </style>
  </div>
)

const NoCambio = () => (
  <p>
      Desde la ultima actualización <span>ningun</span> senador cambio de opinion
  </p>
)

export default ({ changed = [] }) => (
  <div className='cambios-wrapper'>
    { changed.length ? <Cambio changed={changed} /> : <NoCambio /> }
    <style>{`
      .cambios-wrapper {
        width: 100%;
        text-align: center;
        align-self: flex-end;
      }

      .senador {
        margin-left: 5px;
        font-weight: bold;
      }`}
    </style>
  </div>)
