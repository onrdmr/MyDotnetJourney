import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Label,
  Button,
  Item,
  Segment,
  ItemGroup,
  Header,
  Icon,
} from 'semantic-ui-react'
import { Activity } from '../../models/activity'
import { useStore } from '../../store/store'

export default observer(function ActivityListItem(activity: Activity) {
  const [targetActivityId, setTargetActivityId] = useState(activity.id)
  const { activityStore } = useStore()

  const { submitting, activitiesByDate: activities } = activityStore

  function handleActivityDelete(
    e: React.MouseEvent<HTMLButtonElement>,
    activity: Activity
  ) {
    console.log(e.currentTarget.name, 'is clicked')
    setTargetActivityId(e.currentTarget.name)
    activityStore.handleDeleteActivity(activity)
  }

  return (
    <Segment.Group>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image
              size='tiny'
              circular
              src='/assets/user.png'
            ></Item.Image>
            <Item.Content>
              <Item.Header as={Link} to={`/activity/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' />
          {activity.date}
          <Icon name='marker' />
          {activity.venue}
        </span>
      </Segment>
      <Segment secondary>attendees go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activity/${activity.id}`}
          color='teal'
          floated='right'
          content='View'
        ></Button>
      </Segment>
    </Segment.Group>
  )
})
