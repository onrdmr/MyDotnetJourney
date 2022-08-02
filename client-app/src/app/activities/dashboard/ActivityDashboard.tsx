import React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import { Activity } from '../../models/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface Props {
  activities: Activity[]
  selectActivity: (id: string) => void
  cancelSelectActivity: () => void
  selectedActivity: Activity | undefined
  editMode: boolean
  openForm: (id: string) => void
  closeForm: () => void
  createOrEdit: (activity: Activity) => void
  handleDeleteActivity: (activity: Activity) => void
  submitting: boolean
}

export default function ActivityDashboard({
  activities,
  selectActivity,
  cancelSelectActivity,
  selectedActivity,
  openForm,
  closeForm,
  editMode,
  createOrEdit,
  handleDeleteActivity,
  submitting,
}: Props) {
  console.log('dashboard')
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          handleDeleteActivity={handleDeleteActivity}
          submitting={submitting}
        ></ActivityList>
      </Grid.Column>
      <GridColumn width='6'>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
            closeForm={closeForm}
          ></ActivityDetails>
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
            createOrEdit={createOrEdit}
            submitting={submitting}
          ></ActivityForm>
        )}
      </GridColumn>
    </Grid>
  )
}
