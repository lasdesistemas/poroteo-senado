import Head from '../components/head'
import Header from '../components/header'
import Tarjeta from '../components/tarjeta'
import Footer from '../components/footer'

export default () => (
<div>
    <Head/>
    <Header />
    <div className="fila">
      <Tarjeta />
      <Tarjeta />
    </div>
    <Footer />

    <style jsx>{`
      .fila {
        width: 500px;
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
    `}</style>
</div>
)
