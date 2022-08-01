import React from 'react'
import { Label, Button, Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../models/activity'

interface Props {
  activities: Activity[]
  selectActivity: (id: string) => void
  handleDeleteActivity: (activity: Activity) => void
}

export default function ActivityList({
  activities,
  selectActivity,
  handleDeleteActivity,
}: Props) {
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
                  onClick={() => handleDeleteActivity(activity)}
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
