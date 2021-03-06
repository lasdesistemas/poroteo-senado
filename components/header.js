export default () => (
  <header className='header'>
    <a href='https://lasdesistemas.org/'>
      <img
        className='lasdesistemas-logo'
        src='static/assets/img/logos/lasdesistemas.png'
        alt='[LAS] de sistemas' />
    </a>
    <h1 className='title'><span className="main">Votación en senadores 2020</span> <span className="sub">de la ley de aborto legal, seguro y gratuito en Argentina</span></h1>
    <style jsx>{`
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