import React from 'react'

export default class extends React.Component {

    constructor(props) {
      super(props)
      this.state = props.posicion
      this.state.porcentaje = `${Math.floor((this.state.votos / 72) * 100)}%`
    }
    
    render() {
      return (
        <div>
            <div className='tarjeta-container'>
                <div className='tarjeta-header'>
                    <h3>{this.state.titulo}</h3>
                </div>
                <div className={`tarjeta-body ${this.state.color}`}>
                    <h1>{this.state.votos}</h1>
                </div>
            </div>
            <style jsx>{`
            .tarjeta-afavor {
                background-color: #28b463
            }
            .tarjeta-encontra {
                background-color: #e74c3c
            }
            .tarjeta-noconfirmados {
                background-color: #f7dc6f
            }
            .tarjeta-abstenciones {
                background-color: #b2babb 
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
                font-size: 1.4em;
              }
            .tarjeta-container {
                min-width: 260px;
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
                height: ${this.state.porcentaje};
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
  )}

}