import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { Header, Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../models/activity'
import { useStore } from '../../store/store'
import ActivityListItem from './ActivityListItem'

export default observer(function ActivityList() {
  const { activityStore } = useStore()
  const { groupedActivities } = activityStore

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color='teal'>
            {group}
          </Header>
          <Segment>
            <Item.Group divided>
              {activities.map((activity: Activity) => (
                <ActivityListItem
                  key={activity.id}
                  id={activity.id}
                  title={activity.title}
                  description={activity.description}
                  date={activity.date}
                  category={activity.category}
                  city={activity.city}
                  venue={activity.venue}
                ></ActivityListItem>
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </>
  )
})
