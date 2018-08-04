import React from 'react'
import Senator from './senator'

const Cambio = ({ changed }) => (
  <div>
    <p>
          Desde la ultima actualización <span>{changed.length} senadores</span> cambiaron de opinion
    </p>
    <div className='fila' style={{flexWrap: 'wrap'}}>
      { changed.map(({name, from, to, ...s}) => (
        <Senator key={s.Senador} {...s} mini />
      ))}
    </div>
    <style>{`
        .changed {
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
