
export default () => (
    <div className='links'>
      <p> Mas info en:</p>
      <a href='https://activaelcongreso.org/'>
        <img
          className='activa-logo'
          src='static/assets/img/logos/activa.png'
          alt='Activa el Congreso' />
      </a>
      <a href='https://docs.google.com/spreadsheets/d/1mOiTT3JIdQPxVLTQ-a3OivQqE15oLvdWMv6I_DpMZak/edit#gid=1248922160'>
        <img
          className='ecofeminita-logo'
          src='static/assets/img/logos/ecofeminita.png'
          alt='Ecofeminita' />
      </a>
     
     <style jsx>{`
        .activa-logo {
            height: 70px;
            margin: 5px;
        }
        .ecofeminita-logo {
            height: 100px;
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
