import React from 'react'
import Head from '../components/head'
import Header from '../components/header'
import Tarjeta from '../components/tarjeta'
import FechaActualizacion from '../components/fecha-actualizacion'
import Footer from '../components/footer'
import GSheet from 'picosheet'


const processVotes = (data) => data.reduce((acc, p) => {
    if      (p.PosicionCON_MODIF === 'A Favor')       { acc.aFavor++ }
    else if (p.PosicionCON_MODIF === 'En Contra')     { acc.enContra++ }
    else if (p.PosicionCON_MODIF === 'No confirmado') { acc.noConfirmado++ }
    else if (p.PosicionCON_MODIF === 'Se Abstiene')   { acc.seAbstiene++ }
    else { console.error('no data', p) }

    return acc
}, {
    aFavor: 0,
    enContra: 0,
    noConfirmado: 0,
    seAbstiene: 0
})

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }

    GSheet('143fmK1J9Lj9z2gc2EuCyzy9b5d72a32_N0GDveKMrvo', 0, 200)
    .then(processVotes)
    .then(data => {
      console.log("Recuperando datos..")
      this.setState({
        votos: [
            {
                "titulo": "A favor",
                "votos": data.aFavor,
                "color": "tarjeta-afavor"
            },
            { 
                "titulo": "En contra",
                "votos": data.enContra,
                "color": "tarjeta-encontra"
            },
            {
                "titulo": "No confirmados",
                "votos": data.noConfirmado,
                "color": "tarjeta-noconfirmados"
            },
            {
                "titulo": "Se abstienen",
                "votos": data.seAbstiene,
                "color": "tarjeta-abstenciones"
            }
        ],
        fecha: Date.now()
      })
    })
  }

  render() {

    return (
      <div className='container'>
            <Head/>
            <Header />
            {
              this.state.votos &&
              <div className="fila">
                <Tarjeta posicion={this.state.votos[0]}/>
                <div className="divisor"></div>
                <Tarjeta posicion={this.state.votos[1]}/>
                <div className="divisor"></div>
                <Tarjeta posicion={this.state.votos[2]}/>
                <div className="divisor"></div>
                <Tarjeta posicion={this.state.votos[3]}/>
              </div>
            }
            {this.state.fecha &&
              <FechaActualizacion fecha={this.state.fecha} />
            }
            <Footer />
            <style jsx>{`
              .container {
                height: 100vh;
                flex-wrap: wrap;
                align-items: space-between;
                justify-content: center;
                display:flex;
              }
              .fila {
                margin: auto;
                width: 90%;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: flex-start;
                margin-top: 20px;
                margin-bottom: 35px;
              }
              @media (max-width: 767px) {
                .fila {
                  display: block;
                }
              }
              .divisor {
                width:100%;
                min-height:10px;
              }
            `}</style>
        </div>
    )
  }
}
