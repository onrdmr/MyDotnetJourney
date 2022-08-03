import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Button, Container, Form, Segment } from 'semantic-ui-react'
import Navbar from '../../layout/Navbar'
import { Activity } from '../../models/activity'
import { useStore } from '../../store/store'

export default observer(function ActivityForm() {
  const { activityStore } = useStore()
  const { id } = useParams<{ id: string }>()
  const { loadActivity } = activityStore
  const navigate = useNavigate()

  const selectedActivity = activityStore.activity
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  }
  const [activity, setActivity] = useState(initialState)

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) => {
        setActivity(activity!)
        console.log('logging', activity)
      })
  }, [id, loadActivity])

  function handleSubmit() {
    console.log('act', activity)
    activityStore.handleCreateOrEditActivity(activity)
    console.log(activityStore.submitting)
    if (activityStore.submitting == false) navigate('/activities')
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target
    console.log('handle input change', name, value)
    setActivity({ ...activity, [name]: value })
  }

  return (
    <>
      <Navbar></Navbar>
      <Container style={{ marginTop: '5rem' }}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              placeholder='Title'
              value={activity.title}
              name='title'
              onChange={(event) => handleInputChange(event)}
            ></Form.Input>
            <Form.Input
              placeholder='Description'
              value={activity.description}
              name='description'
              onChange={(event) => handleInputChange(event)}
            ></Form.Input>
            <Form.Input
              placeholder='Category'
              value={activity.category}
              name='category'
              onChange={(event) => handleInputChange(event)}
            ></Form.Input>
            <Form.Input
              placeholder='Date'
              value={activity.date}
              type='date'
              name='date'
              onChange={(event) => handleInputChange(event)}
            ></Form.Input>
            <Form.Input
              placeholder='City'
              value={activity.city}
              name='city'
              onChange={(event) => handleInputChange(event)}
            ></Form.Input>
            <Form.Input
              placeholder='Venue'
              value={activity.venue}
              name='venue'
              onChange={handleInputChange}
            ></Form.Input>
            <Button
              loading={activityStore.submitting}
              floated='right'
              positive
              type='submit'
              content='Submit'
            ></Button>
            <Button
              floated='right'
              positive
              type='button'
              content='Cancel'
              // onClick={activityStore.handleFormClose}
            ></Button>
          </Form>
        </Segment>
      </Container>
    </>
  )
})
