import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import './global.css'
import Index from './pages'
import registerServiceWorker from './registerServiceWorker'

const root = document.getElementById('root')
render(<Router><Index /></Router>, root)
registerServiceWorker()
