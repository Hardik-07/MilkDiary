import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ActiveLinkProvider } from './context'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
    <ActiveLinkProvider>
        <App />
    </ActiveLinkProvider>,
    document.getElementById('root')
)
reportWebVitals()
