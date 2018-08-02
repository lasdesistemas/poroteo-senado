import React from 'react'
import ReactDOM from 'react-dom'
import './global.css'
import App from './pages'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
