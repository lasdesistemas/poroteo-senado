import React from 'react'
const colors = {
  afavor: '#28b463',
  encontra: '#e74c3c',
  abstenciones: '#b2babb',
  noconfirmados: '#f7dc6f'
}

export default ({titulo, votos, color}) => {
  const porcentaje = Math.floor((votos / 72) * 100)
  return (
      <div>
          <div className={`tarjeta-container`} style={{borderColor: colors[color]}}>
              <div className='tarjeta-header' style={{ color: colors[color]}}>
                  <h3><span>{titulo}</span></h3>
              </div>
              <div className={`tarjeta-body ${color}`}
                   style={{height: `${porcentaje}%`, background: colors[color]}}>
                  <h1>{votos}</h1>
              </div>
          </div>
          <style>{`
.tarjeta-container {
    border-bottom: 3px solid;
}
.tarjeta-container h3 span {
    color: black;
}
.tarjeta-container h3:before{
    content: '';
    padding-right: 10px;
    border-left: 8px solid;
}
@media (max-width: 767px) {
    .tarjeta-container {
        min-width: 35vw!important;
        height: 40vh!important;
    }
}

.tarjeta-header {
    display: flex;
    flex-wrap: wrap;
    background-color: #ebedef;
    color: #566573;
    justify-content: center;
    text-align: center;
    margin-bottom: auto;
}
.tarjeta-header h3 {
    order: 2;
    text-transform: uppercase;
    font-size: .8em;
}
.tarjeta-container {
    min-width: 150px;
    height: 400px;
    background-color: #ebedef;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.tarjeta-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-style: solid;
    border-color: #ebedef;
    border-width: 10px;
    position: relative;
}

.tarjeta-container .tarjeta-body > h1 {
    position: absolute;
    bottom: 0;
}
.border-row {
    border-bottom: 1px solid #da536f;
}
.tarjeta-footer {
    background-color: #ebedef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 5px 5px;
}
.lasdesistemas {
    height: 50px;
    margin-right: 10px;
}
              `}</style>
      </div>
  )
}
