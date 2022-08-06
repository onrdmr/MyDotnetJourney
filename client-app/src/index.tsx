import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/layout/style.css'
import App from './app/layout/App'
import reportWebVitals from './reportWebVitals'
import { store, StoreContext } from './app/stores/store'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import HomePage from './features/Home/HomePage'
import ActivityDashboard from './app/activities/dashboard/ActivityDashboard'
import ActivityDetails from './app/activities/details/ActivityDetails'
import ActivityForm from './app/activities/form/ActivityForm'
import 'react-toastify/dist/ReactToastify.min.css'
import { createBrowserHistory } from 'history'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'

export const history = createBrowserHistory()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <>
    <StoreContext.Provider value={store}>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </StoreContext.Provider>
  </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
