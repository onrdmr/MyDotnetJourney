import React, { useEffect, useState } from 'react'
import { Button, Container } from 'semantic-ui-react'
import NavBar from './Navbar'
import ActivityDashboard from '../activities/dashboard/ActivityDashboard'
import LoadPage from './LoadPage'
import { store, useStore } from '../store/store'
import { observer } from 'mobx-react-lite'
import { Route, Routes, useLocation } from 'react-router-dom'
import ActivityForm from '../activities/form/ActivityForm'
import HomePage from '../../features/Home/HomePage'
import ActivityDetails from '../activities/details/ActivityDetails'
// import useStore from '../store/store'

function App() {
  const location = useLocation()
  const { activityStore } = useStore()

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])

  if (activityStore.loadingInitial) {
    console.log('loading')
    return (
      <>
        <LoadPage inverted={true} content={'loading'}></LoadPage>
      </>
    )
  }
  console.log('rendering items')
  return (
    <>
      <Routes>
        <Route
          path='/activities'
          element={<ActivityDashboard></ActivityDashboard>}
        ></Route>
        <Route path='/' element={<HomePage></HomePage>}></Route>

        <Route
          path='/activity/:id'
          element={<ActivityDetails></ActivityDetails>}
        ></Route>
        <Route
          path='/manage/:id'
          element={<ActivityForm></ActivityForm>}
        ></Route>
        <Route
          key={location.key}
          path='/createActivity'
          element={<ActivityForm></ActivityForm>}
        ></Route>
      </Routes>
    </>
  )
}

export default observer(App)
