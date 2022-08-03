import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Container, Button } from 'semantic-ui-react'
import { useStore } from '../store/store'

// interface Props {
//   openForm: () => void
// }

export default function NavBar() {
  const { activityStore } = useStore()

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' header>
          <img
            src='/assets/logo.png'
            alt='logo'
            style={{ marginRight: '10px' }}
          ></img>
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' as={NavLink} to='/activities' />
        <Menu.Item>
          <Button
            as={NavLink}
            to='/createActivity'
            onClick={() => activityStore.handleFormOpen()}
            positive
            content='Create Activity'
          />
        </Menu.Item>
      </Container>
    </Menu>
  )
}
