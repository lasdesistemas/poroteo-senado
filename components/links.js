
export default () => (

    <div className='links'>
      <p> Más info en:</p>
      <a href='https://activaelcongreso.org/'>
        <img
          className='activa-logo'
          src='static/assets/img/logos/activa2.png'
          alt='Activa el Congreso' />
      </a>
      <a href='https://docs.google.com/spreadsheets/d/1TUTag7Majqhn5noRLLMUJ6SFJ0Phwlo-Oc1T59uSZCE/edit#gid=219162967'>
        <img
          className='ecofeminita-logo'
          src='static/assets/img/logos/ecofeminita.png'
          alt='Ecofeminita' />
      </a>

     <style jsx>{`
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
