import Head from '../components/head'
import Header from '../components/header'
import Tarjeta from '../components/tarjeta'
import Footer from '../components/footer'
import votos from '../static/assets/votos.json'

export default () => (
<div>
    <Head/>
    <Header />
    <div className="fila">
      <Tarjeta posicion={votos[0]}/>
      <div className="divisor"></div>
      <Tarjeta posicion={votos[1]}/>
      <div className="divisor"></div>
      <Tarjeta posicion={votos[2]}/>
      <div className="divisor"></div>
      <Tarjeta posicion={votos[3]}/>
    </div>
    <Footer />

    <style jsx>{`
      .fila {
        margin: auto;
        width: 90%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        height: 700px;
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
      }
    `}</style>
</div>
)
