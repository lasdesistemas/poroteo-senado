import moment from 'moment-timezone'
import Links from '../components/links'

moment.locale('es')

export default ({ fecha }) => (
  <div className='fecha-wrapper'>
    <p>
      Última actualización:
      <span>{moment(fecha).fromNow()}</span>
    </p>
    <Links/>
    <style jsx>{`
      .fecha-wrapper {
        width: 100%;
        text-align: center;
        align-self: flex-end;
      }

      .fecha-wrapper span {
        margin-left: 5px;
        font-weight: bold;
      }
    `}</style>
  </div>
)