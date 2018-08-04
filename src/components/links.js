import React from 'react'

import activa from '../img/logos/activa2.png.webp'
import ecofem from '../img/logos/ecofeminita.png.webp'

export default () => (

  <div className='links'>
    <p> Más info en:</p>
    <a href='https://activaelcongreso.org/'>
      <img
        className='activa-logo'
        src={activa}
        alt='Activa el Congreso' />
    </a>
    <a href='https://docs.google.com/spreadsheets/d/1mOiTT3JIdQPxVLTQ-a3OivQqE15oLvdWMv6I_DpMZak/edit#gid=1248922160'>
      <img
        className='ecofeminita-logo'
        src={ecofem}
        alt='Ecofeminita' />
    </a>

    <style>{`
        .activa-logo {
            height: 80px;
            margin: 5px;
        }
        .ecofeminita-logo {
            height: 90px;
            margin: 5px;
        }
        .links {
            display: flex;
            justify-content: center;
            align-self: flex-end;
          }
      `}</style>
  </div>
)
