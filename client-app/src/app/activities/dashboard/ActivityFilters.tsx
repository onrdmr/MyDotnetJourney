import Calendar from 'react-calendar'
import { Header, Menu, Segment } from 'semantic-ui-react'

export default function ActivityFilters() {
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item content='All Activities'></Menu.Item>
        <Menu.Item content='I am going'></Menu.Item>
        <Menu.Item content='I am hosting'></Menu.Item>
        <Menu.Item content='gibberishing'></Menu.Item>
      </Menu>
      {/* <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}> */}
      <Header attached color='teal' content='Date'>
        <Segment>
          <Calendar />
        </Segment>
      </Header>
    </>
  )
}
