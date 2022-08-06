import React, { useEffect } from 'react'
import { Container, Grid, GridColumn } from 'semantic-ui-react'
import { useStore } from '../../stores/store'
import 'react-calendar/dist/Calendar.css'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'
import { observer } from 'mobx-react-lite'
import LoadPage from '../../layout/LoadPage'
import Navbar from '../../layout/Navbar'
import ActivityFilters from './ActivityFilters'

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
  useEffect(() => {
    console.log('rendering activity dashboard')
  }, [activityStore.loading])

  console.log('loading', activityStore.loading)
  if (activityStore.loadingInitial || activityStore.loading) {
    console.log('loading')
    return (
      <>
        <LoadPage inverted={true} content={'loading'}></LoadPage>
      </>
    )
  }

  return (
    <>
      <Navbar></Navbar>
      <Container style={{ marginTop: '5em' }}>
        <Grid>
          <Grid.Column width='10'>
            <ActivityList></ActivityList>
          </Grid.Column>
          <GridColumn width='6'>
            <ActivityFilters></ActivityFilters>
            {/* {selectedActivity && !editMode && <ActivityDetails></ActivityDetails>} */}
            {/* {editMode && <ActivityForm></ActivityForm>} */}
          </GridColumn>
        </Grid>
      </Container>
    </>
  )
})
