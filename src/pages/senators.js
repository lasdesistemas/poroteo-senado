import React from 'react'
import Senator from '../components/senator'

import SID from '../senadores.json'

const Senators = ({ match, senators }) => (
  <div className='fila' style={{flexWrap: 'wrap'}}>
    { senators.filter(s => (s.PosicionCON_MODIF === match.params.vote))
      .map(s => (<Senator {...s} />))
    }
  </div>
)

export default Senators
