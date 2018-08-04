import React from 'react'
import { Link } from 'react-router-dom'

import lasdesistemas from '../img/logos/lasdesistemas.png.webp'

export default ({goBack}) => (
  <header className='header'>
    <Link to='/'>
      <img
        className='lasdesistemas-logo'
        src={lasdesistemas}
        alt='[LAS] de sistemas' />
      {goBack && <span className='back'>volver</span>}
    </Link>
    <h1 className='title'><span className='main'>Votación en senadores</span> <span className='sub'>de la ley de aborto legal, seguro y gratuito en Argentina</span></h1>
    <style>{`
      .header {
        width:100%;
        align-self: flex-start;
        border-bottom: 1px solid #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 100px;
        background-color: #f8f6e5;
      }
      .back {
        height: 0;
        top: -23px;
        position: relative;
        left: 15px;
        display: inherit;
      }
      .lasdesistemas-logo {
        height: 80px;
      }
      .title {
        color: black;
        font-size: 28px;
        line-height: 22px;
      }
      .main{
        display:block;
        text-transform: uppercase;
      }
      .sub{
        font-size:14px;
        font-weight:100;
      }
      @media (max-width: 768px) {
        .header {
          padding: 5px 20px;
        }
        .title {
          font-size: 20px;
        }
      }
            `}</style>
  </header>
)
