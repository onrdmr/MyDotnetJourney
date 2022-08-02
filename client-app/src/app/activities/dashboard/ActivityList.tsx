import React, { SyntheticEvent, useState } from 'react'
import { Label, Button, Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../models/activity'

interface Props {
  activities: Activity[]
  selectActivity: (id: string) => void
  handleDeleteActivity: (activity: Activity) => void
  submitting: boolean
}

export default function ActivityList({
  activities,
  selectActivity,
  handleDeleteActivity,
  submitting,
}: Props) {
  const [targetActivityId, setTargetActivityId] = useState('')

  function handleActivityDelete(
    e: React.MouseEvent<HTMLButtonElement>,
    activity: Activity
  ) {
    console.log(e.currentTarget.name, 'is clicked')
    setTargetActivityId(e.currentTarget.name)
    handleDeleteActivity(activity)
  }

  console.log('target Activityy id is', targetActivityId)
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity: Activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city}</div>
                <div>{activity.venue}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(activity.id)}
                  floated='right'
                  content='view'
                  color='blue'
                ></Button>
                <Button
                  name={activity.id}
                  loading={submitting && activity.id === targetActivityId}
                  onClick={(e) => handleActivityDelete(e, activity)}
                  floated='right'
                  content='delete'
                  color='red'
                ></Button>
                <Label basic content={activity.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}
