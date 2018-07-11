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
            <div className={`tarjeta-container ${this.state.color}`}>
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
            
            .tarjeta-container.tarjeta-afavor{
                border-bottom: 3px solid #28b463;
            }
            .tarjeta-container.tarjeta-afavor h3:before{
                content: '';
                padding-right: 10px;
                border-left: 8px solid #28b463;
            }

            .tarjeta-container.tarjeta-encontra{
                border-bottom: 3px solid #e74c3c;
            }
            .tarjeta-container.tarjeta-encontra h3:before{
                content:'';
                padding-right: 10px;
                border-left: 8px solid #e74c3c;
            }

            .tarjeta-container.tarjeta-abstenciones{
                border-bottom: 3px solid #b2babb;
            }
            .tarjeta-container.tarjeta-abstenciones h3:before{
                content:'';
                padding-right: 10px;
                border-left: 8px solid #b2babb;
            }

            .tarjeta-container.tarjeta-noconfirmados{
                border-bottom: 3px solid #f7dc6f;
            }
            .tarjeta-container.tarjeta-noconfirmados h3:before{
                content:'';
                padding-right: 10px;
                border-left: 8px solid #f7dc6f;
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