import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../models/activity'

interface Props {
  activity: Activity | undefined
  closeForm: () => void
  createOrEdit: (activity: Activity) => void
}

export default function ActivityForm({
  activity: selectedActivity,
  closeForm,
  createOrEdit,
}: Props) {
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

  function handleSubmit() {
    console.log(activity)
    createOrEdit(activity)
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target
    setActivity({ ...activity, [name]: value })
  }

  return (
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
          onClick={closeForm}
        ></Button>
      </Form>
    </Segment>
  )
}
