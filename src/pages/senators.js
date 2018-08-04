import React from 'react'
import Senator from '../components/senator'

const Senators = ({ match, senators }) => (
  <div className='fila' style={{flexWrap: 'wrap'}}>
    { senators.filter(s => (s.PosicionCON_MODIF === match.params.vote))
      .map(s => (<Senator key={s.Senador} {...s} />))
    }
  </div>
)

export default Senators
