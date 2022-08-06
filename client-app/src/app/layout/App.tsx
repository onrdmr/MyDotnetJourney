import React, { useEffect } from 'react'
import ActivityDashboard from '../activities/dashboard/ActivityDashboard'
import LoadPage from './LoadPage'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'
import { Route, Routes, useLocation } from 'react-router-dom'
import ActivityForm from '../activities/form/ActivityForm'
import HomePage from '../../features/Home/HomePage'
import ActivityDetails from '../activities/details/ActivityDetails'
import TestErrors from '../../features/errors/Test.Error'
import { ToastContainer } from 'react-toastify'
import NotFound from '../../features/errors/NotFound'
import ServerError from '../../features/errors/ServerError'
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
      <ToastContainer position='bottom-right' hideProgressBar />
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
        <Route path='/errors' element={<TestErrors />} />
        <Route path='server-error' element={<ServerError />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default observer(App)
