import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

export default function NotFound() {
  console.log('not found rendering')
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search' />
        Oops - we have looked everywhere and could not find this.
      </Header>
      <Segment.Inline>
        <Button as={Link} to='/activities'>
          return to activities page
        </Button>
      </Segment.Inline>
    </Segment>
  )
}
