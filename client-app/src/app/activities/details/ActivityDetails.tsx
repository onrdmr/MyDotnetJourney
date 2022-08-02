import React from 'react'
import {
  ButtonGroup,
  Button,
  Card,
  Icon,
  Image,
  Loader,
} from 'semantic-ui-react'
import { useStore } from '../../store/store'

export default function ActivityDetails() {
  const { activityStore } = useStore()
  const selectedActivity = activityStore.activity
  if (!selectedActivity) {
    return <Loader></Loader>
  }
  const { category, title, date, description } = selectedActivity
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className='date'>{date}</span>
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths='2'>
          <Button
            onClick={() => activityStore.handleFormOpen(selectedActivity.id)}
            basic
            color='blue'
            content='Edit'
          ></Button>
          <Button
            onClick={() => {
              activityStore.handleCancelSelectActivity()
            }}
            basic
            color='red'
            content='Cancel'
          ></Button>
        </ButtonGroup>
      </Card.Content>
    </Card>
  )
}
