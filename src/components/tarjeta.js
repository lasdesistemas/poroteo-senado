import React from 'react'
const colors = {
  afavor: '#28b463',
  encontra: '#e74c3c',
  abstenciones: '#b2babb',
  noconfirmados: '#f7dc6f'
}

export default ({titulo, votos, color, senators}) => {
  const porcentaje = Math.floor((votos / 72) * 100)
  return (
    <div>
      <div className={`tarjeta-container`} style={{borderColor: colors[color]}}>
        <div className='tarjeta-header' style={{ color: colors[color]}}>
            <h3><span>{titulo}</span></h3>
            <ul>
                {senators.map(s => <li key={s.Senador}>{s.Senador.split(',')[0]}</li>)}
            </ul>
        </div>
        <div className={`tarjeta-body ${color}`}
          style={{height: `${porcentaje}%`, background: colors[color]}}>
          <h1>{votos}</h1>
        </div>
      </div>
    </div>
  )
}
