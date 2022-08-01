import { Activity } from '../models/activity'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import NavBar from './Navbar'
import ActivityDashboard from '../activities/dashboard/ActivityDashboard'
import { v4 as uuid, v4 } from 'uuid'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined)

  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    axios
      .get<Activity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        // console.log(response.data)
        setActivities(response.data)
      })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id))
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined)
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity()
    setEditMode(true)
  }

  function handleFormClose() {
    setEditMode(false)
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }])

    setEditMode(false)
    setSelectedActivity(activity)
  }

  function handleDeleteActivity(activity: Activity) {
    setActivities([...activities.filter((x) => x.id !== activity.id)])
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '5em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          handleDeleteActivity={handleDeleteActivity}
        ></ActivityDashboard>
      </Container>
    </>
  )
}

export default App
