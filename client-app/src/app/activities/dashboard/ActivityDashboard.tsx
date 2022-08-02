import React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import { useStore } from '../../store/store'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'
import { observer } from 'mobx-react-lite'

// interface Props {
//   // activities: Activity[]
//   selectActivity: (id: string) => void
//   cancelSelectActivity: () => void
//   // selectedActivity: Activity | undefined
//   // editMode: boolean
//   // openForm: (id: string | undefined) => void
//   // closeForm: () => void
//   // createOrEdit: (activity: Activity) => void
//   // handleDeleteActivity: (activity: Activity) => void
//   activities: Activity[]
//   selectedActivity: Activity | undefined
//   editMode: boolean
//   openForm: (id?: string | undefined) => void
//   closeForm: () => void
//   createOrEdit: (a: Activity) => void
//   handleDeleteActivity: (a: Activity) => void
//   submitting: boolean
// }

export default observer(function ActivityDashboard() {
  console.log('dashboard')
  const { activityStore } = useStore()
  const { activity: selectedActivity, editMode } = activityStore

  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList></ActivityList>
      </Grid.Column>
      <GridColumn width='6'>
        {selectedActivity && !editMode && <ActivityDetails></ActivityDetails>}
        {editMode && <ActivityForm></ActivityForm>}
      </GridColumn>
    </Grid>
  )
})
