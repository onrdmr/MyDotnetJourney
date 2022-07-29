import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import { Header, List } from 'semantic-ui-react'
function App() {
  const [activities, setActivities] = useState<any>([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then((response) => {
      console.log(response)
      setActivities(response.data)
    })
  }, [])

  return (
    <div className='App'>
      <Header as='h2' icon='users' content='Reactivities' />
      <List>
        {activities.map((activity: any) => (
          <li key={activity.id}>{activity.title}</li>
        ))}
      </List>
    </div>
  )
}

export default App
