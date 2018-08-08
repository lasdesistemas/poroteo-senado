import React from 'react'

import Senator from './senator'

export default class Search extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            senators: [],
        }
    }

    search(e) {
        const value = e.target.value
        if (value === "") {
            return this.setState({
                senators: []
            })
        }
        const names = this.props.senators.map(s => ({name: s.Senador.split(',')[0], s}))
        console.error("name", names)
        return this.setState({
            senators: names
                          .filter(n => n.name.match(new RegExp(value, 'i')))
                          .map(n => n.s)
        })
    }

    render() {
        const { senators } = this.state
        console.error('==>', senators, this.state.names)
        return(
            <div className='search'>
                <div>
                    <span>busca un senador: </span>
                    <input type="search" onChange={this.search.bind(this)}/>
                </div>
                { senators.map(s => <Senator key={s.Senador} {...s} mini />)}
            </div>
        )
    }
}
