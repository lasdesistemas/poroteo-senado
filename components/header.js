export default () => (
  <header className='header'>
    <a href='/'>
      <img
        className='lasdesistemas-logo'
        src='static/assets/img/logos/lasdesistemas.png'
        alt='[LAS] de sistemas' />
    </a>
    <h1 className='title'>Poroteo en senadores</h1>
    <style jsx>{`
      .header {
        border-bottom: 1px solid #FFF;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 100px;
      }
      .lasdesistemas-logo {
        height: 50px;
      }
      .title {
        color: #292965;
        font-size: 26px;
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