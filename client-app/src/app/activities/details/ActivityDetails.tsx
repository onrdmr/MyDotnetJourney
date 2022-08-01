import React from 'react'
import { ButtonGroup, Button, Card, Icon, Image } from 'semantic-ui-react'
import { Activity } from '../../models/activity'

interface Props {
  activity: Activity
  cancelSelectActivity: () => void
  openForm: (id: string) => void
  closeForm: () => void
}

export default function ActivityDetails({
  activity,
  cancelSelectActivity,
  openForm,
  closeForm,
}: Props) {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span className='date'>Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths='2'>
          <Button
            onClick={() => openForm(activity.id)}
            basic
            color='blue'
            content='Edit'
          ></Button>
          <Button
            onClick={() => {
              cancelSelectActivity()
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
