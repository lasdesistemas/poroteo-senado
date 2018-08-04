import React from 'react'
import { hydrate, render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import './global.css'
import Index from './pages'
import registerServiceWorker from './registerServiceWorker'

const root = document.getElementById('root')
if (root.hasChildNodes()) {
    hydrate(<Router><Index /></Router>, root)
} else {
    render(<Router><Index /></Router>, root)
}
registerServiceWorker()
