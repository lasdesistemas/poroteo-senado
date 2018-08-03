import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import './global.css'
import App from './pages'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'))
registerServiceWorker()
