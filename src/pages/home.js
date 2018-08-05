import React from 'react'

import Tarjeta from '../components/tarjeta'

import { Link } from 'react-router-dom'

const Home = ({ match, votos = [] }) => (
  <div className='fila'>
    {votos.map((voto, i) => <Link key={i} to={`/senators/by-vote/${voto.titulo}`}>
      <Tarjeta {...voto} />
      <div className='divisor' />
    </Link>
    )}
    <style>{`
           .divisor {
                    width:100%;
                    min-height:10px;
           }
            `}</style>
  </div>
)

export default Home
