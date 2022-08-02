import { Activity } from '../models/activity'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import NavBar from './Navbar'
import ActivityDashboard from '../activities/dashboard/ActivityDashboard'
import { v4 as uuid, v4 } from 'uuid'
import agent from '../api/agent'
import LoadPage from './LoadingComponent'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined)

  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    var axiosRespData = agent.Activities.list()
    // console.log({ axiosRespData })
    axiosRespData
      .then((response) => setActivities(response))
      .then(() => {
        activities.map((activity) => {
          activity.date = activity.date.split('T')[0]
        })
      })
      .finally(() => {
        console.log('set Loading false')
        setLoading(false)
      })

    // agent.requests.del("  ").then(null)
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
    setSubmitting(true)

    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
        setSubmitting(false)
      })
    } else {
      const newActivity: Activity = { ...activity, id: uuid() }
      console.log(newActivity, uuid())

      agent.Activities.create(newActivity).then(() => {
        setActivities([...activities, newActivity])
        setSubmitting(false)
      })
    }

    setEditMode(false)
    setSelectedActivity(activity)
  }

  function handleDeleteActivity(activity: Activity) {
    setSubmitting(true)
    agent.Activities.delete(activity).then(() => {
      setActivities([...activities.filter((x) => x.id !== activity.id)])
      setSubmitting(false)
    })
  }

  if (loading) {
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
          submitting={submitting}
        ></ActivityDashboard>
      </Container>
    </>
  )
}

export default App
