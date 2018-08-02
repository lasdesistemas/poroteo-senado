export default () => (
  <footer className='footer'>
    <div>
      <p>Hecho con ❤ por
        <a href='https://twitter.com/lasdesistemas' target='blank'>
            [LAS] de sistemas
      </a>
      </p>

    </div>
    <style jsx>{`
      .footer {
        display: flex;
        background-color: #f8f6e5;
        justify-content: center;
        width:100%;
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
