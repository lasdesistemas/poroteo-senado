import React from 'react'


export default class extends React.Component {

    constructor(props) {
      super(props)
      this.state = props.posicion
      this.state.clase = 'tarjeta-body ' + this.state.color
    }
    
    render() {
      return (
        <div>
            <div className='tarjeta-container'>
                <div className='tarjeta-header'>
                    <h3>{this.state.titulo}</h3>
                </div>
                <div className={this.state.clase}>
                    <h1>{this.state.votos}</h1>
                </div>
                <div className='tarjeta-footer'>
                    <a href='https://twitter.com/lasdesistemas' target='blank'>
                        <img className='lasdesistemas' src='/static/assets/img/logos/lasdesistemas.png' alt='[LAS] de sistemas' />
                    </a>
                </div>
            </div>
            <style jsx>{`
            .tarjeta-afavor {
                background-color: #28b463
            }
            .tarjeta-encontra {
                background-color: #f7dc6f
            }
            .tarjeta-indecises {
                background-color: #e74c3c
            }
             .tarjeta-header {
                display: flex;
                flex-wrap: wrap;
                background-color: #ebedef;
                color: #566573;
                margin: 0 10px;
                justify-content: center;
                text-align: center;
              }
              .tarjeta-header h3 {
                order: 2;
                text-transform: uppercase;
                font-size: 1.4em;
              }
            .tarjeta-container {
                width:400px;
                height:850px;
            }
            .tarjeta-body {
                margin: 0 10px;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                height: 60%;
                border-style: solid;
                border-color: #ebedef;
                border-width: 10px;
            }
            .tarjeta-container .tarjeta-body > h1 {
                position: relative;
                top: 50%;
                float: left;
            }
            .border-row {
                border-bottom: 1px solid #da536f;
            }
            .tarjeta-footer {
                background-color: #ebedef;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 0 10px;
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