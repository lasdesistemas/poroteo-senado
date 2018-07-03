import moment from 'moment-timezone'
moment.locale('es')

export default ({ fecha }) => (
  <div>
  {moment(fecha).tz("America/Argentina/Buenos_Aires").format()}
  </div>
)