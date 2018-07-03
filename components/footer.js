import Links from '../components/links'

export default () => (
  <footer className='footer'> 
    <Links/>
    <p>Hecho con ❤ por 
      <a href='https://twitter.com/lasdesistemas' target='blank'>
        [LAS] de sistemas
      </a> 
    </p>
    <style jsx>{`
      .footer {
        display: flex;
        justify-content: center;
        align-self: flex-end;
        flex-direction: column;
      }
      a {
        margin: 0 5px;
        color: #292965;
        text-decoration: none;
        font-weight: bold;
        cursor: pointer;
      }
      a:hover {
        color: #bd3547;
      }
      @media (max-width: 768px) {
        .footer p {
          text-align: center;
          font-size: 12px;
        }
      }
    `}</style>
  </footer>
)