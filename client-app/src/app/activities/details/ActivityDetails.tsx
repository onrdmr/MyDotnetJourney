import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ButtonGroup,
  Button,
  Card,
  Image,
  Container,
  Grid,
  GridColumn,
} from 'semantic-ui-react'
import LoadPage from '../../layout/LoadPage'
import Navbar from '../../layout/Navbar'
import { useStore } from '../../stores/store'
import ActivityDetailedSidebar from './ActivityDetailedSidebar'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'

export default observer(function ActivityDetails() {
  const { activityStore } = useStore()
  const {
    activity: selectedActivity,
    loadActivity,
    loadingInitial,
  } = activityStore
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) loadActivity(id)
  }, [id, loadActivity])

  if (loadingInitial || !selectedActivity) {
    return <LoadPage inverted={false} content={'Loading'}></LoadPage>
  }
  const { category, title, date, description } = selectedActivity

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={selectedActivity} />
        <ActivityDetailedInfo activity={selectedActivity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  )
})
// return (
//   <>
//     <Navbar></Navbar>
//     <Container style={{ marginTop: '5rem' }}>
//       <Card fluid>
//         <Image
//           src={`/assets/categoryImages/${category}.jpg`}
//           wrapped
//           ui={false}
//         />
//         <Card.Content>
//           <Card.Header>{title}</Card.Header>
//           <Card.Meta>
//             <span className='date'>{date}</span>
//           </Card.Meta>
//           <Card.Description>{description}</Card.Description>
//         </Card.Content>
//         <Card.Content extra>
//           <ButtonGroup widths='2'>
//             <Button
//               // onClick={() => activityStore.handleFormOpen(selectedActivity.id)}
//               as={Link}
//               to={`/manage/${id}`}
//               basic
//               color='blue'
//               content='Edit'
//             ></Button>
//             <Button
//               // onClick={() => activityStore.handleCancelSelectActivity()}
//               as={Link}
//               to={'/activities'}
//               basic
//               color='red'
//               content='Cancel'
//             ></Button>
//           </ButtonGroup>
//         </Card.Content>
//       </Card>
//     </Container>
//   </>
