import React from 'react'
import { VOTE_CLASS } from '../constants'

import Senator from './senator'

const Cambio = ({ changed }) => (
  <div>
    <p>
          Desde la ultima actualización <span>{changed.length} senadores</span> cambiaron de opinion
    </p>
    <ul>
      { changed.map(({name, from, to, ...s}) => (
        <li key={name}>
          <Senator {...s} mini />
        </li>
      ))}
    </ul>
    <style>{`
        li {
		display: block;
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
