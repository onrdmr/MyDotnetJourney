import { Link } from 'react-router-dom'
import { Image, Container, Header, Segment, Button } from 'semantic-ui-react'
import ActivityForm from '../../app/activities/form/ActivityForm'
import Navbar from '../../app/layout/Navbar'

export default function HomePage() {
  return (
    <>
      {/* <Navbar></Navbar> */}
      <Segment inverted textAlign='center' vertical className='masthead'>
        <Container text>
          <Header>
            <Image
              size='massive'
              src='/assets/logo.png'
              alt='logo'
              style={{ marginBottom: 12 }}
            />
            Reactivities
          </Header>
          <Header as='h2' inverted content='Welcome to reactivities'></Header>
          <Button as={Link} to='/activities' size='huge' inverted>
            Take Me To Activities
          </Button>
        </Container>
      </Segment>
    </>
  )
}
