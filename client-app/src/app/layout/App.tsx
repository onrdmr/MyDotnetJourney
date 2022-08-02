import { Activity } from '../models/activity'
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'semantic-ui-react'
import NavBar from './Navbar'
import ActivityDashboard from '../activities/dashboard/ActivityDashboard'
import agent from '../api/agent'
import LoadPage from './LoadingComponent'
import { store, useStore } from '../store/store'
import { observer } from 'mobx-react-lite'
// import useStore from '../store/store'

function App() {
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
      <NavBar openForm={activityStore.handleFormOpen} />
      <Container style={{ marginTop: '5em' }}>
        <ActivityDashboard></ActivityDashboard>
      </Container>
    </>
  )
}

export default observer(App)
