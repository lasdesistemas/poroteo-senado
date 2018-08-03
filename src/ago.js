// taken from https://github.com/sebastiansandqvist/s-ago/blob/master/index.js

function format (diff, divisor, unit, prev) {
  var val = Math.round(diff / divisor)
  return val <= 1 ? prev : 'hace ' + val + ' ' + unit + 's'
}

function ago (time) {
  var diff = Math.abs(Date.now() - time)
  var units = ago.units

  if (diff < 60000) { // less than a minute
    return 'ahora'
  }

  for (var i = 0; i < units.length; i++) {
    if (diff < units[i].max) {
      return format(diff, units[i].value, units[i].name, units[i].prev)
    }
  }
}

ago.units = [
  { max: 2760000, value: 60000, name: 'minuta', prev: 'hace un minuto' }, // max: 46 minutes
  { max: 72000000, value: 3600000, name: 'hora', prev: 'hace una hora' }, // max: 20 hours
  { max: 518400000, value: 86400000, name: 'dia', prev: 'ayer' }, // max: 6 days
  { max: 2419200000, value: 604800000, name: 'semana', prev: 'hace una semana' }, // max: 28 days
  { max: 28512000000, value: 2592000000, name: 'mes', prev: 'hace un mes' }, // max: 11 months
  { max: Infinity, value: 31536000000, name: 'año', prev: 'hace un año' }
]

export default ago
