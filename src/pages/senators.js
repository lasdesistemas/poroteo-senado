import React from 'react'

import SID from '../senadores.json'

const Senators = ({ match, senators }) => (
  <div className='fila' style={{flexWrap: 'wrap'}}>
    { senators.filter(s => (s.PosicionCON_MODIF === match.params.vote))
      .map(s => {
        const name = s.Senador.split(', ')
        const id = SID[`${name[1]} ${name[0]}`]
        const img = s.Senador === 'MICHETTI, MARTA GABRIELA'
          ? 'http://www.senado.gov.ar/adjunto/autoridadesCamara/11'
          : `http://www.senado.gov.ar/bundles/senadosenadores/images/fsenaG/${id}.png`

        return (
          <div key={s.Senador}>
            <img src={img} alt={s.Senador} />
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
    }
  </div>
)

export default Senators
