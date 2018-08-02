import React from 'react'
import { VOTE_CLASS } from '../constants'

const Cambio = ({ changed }) => (
  <div>
    <p>
            Desde la ultima actualización <span>{changed.length} senadores</span> cambiaron de opinion
    </p>
    <ul>
      { changed.map(({name, from, to}) => (
        <li>
          {name} de <span className={VOTE_CLASS[from]}>{from}</span> a <span className={VOTE_CLASS[to]}>{to}</span>
        </li>
      ))}
    </ul>
    <style jsx>{`
            .tarjeta-afavor {
                color: #28b463
            }
            .tarjeta-encontra {
                color: #e74c3c
            }
            .tarjeta-noconfirmados {
                color: #f7dc6f
            }
            .tarjeta-abstenciones {
                color: #b2babb
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
    <style jsx>{`
      .cambios-wrapper {
        width: 100%;
        text-align: center;
        align-self: flex-end;
      }

      .cambios-wrapper span {
        margin-left: 5px;
        font-weight: bold;
      }`}
    </style>
  </div>)
