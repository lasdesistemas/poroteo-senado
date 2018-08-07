import React from 'react'
import { render } from 'react-dom'
import './global.css'
import Index from './pages'
import registerServiceWorker from './registerServiceWorker'

const root = document.getElementById('root')
render(<Index />, root)
registerServiceWorker()
