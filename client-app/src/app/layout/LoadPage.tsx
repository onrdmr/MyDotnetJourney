import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import { Activity } from '../models/activity'

interface Props {
  inverted: boolean
  content: string
}

export default function LoadPage({ inverted = false, content }: Props) {
  return (
    <Dimmer active>
      <Loader inverted active inline='centered' content={content}></Loader>
    </Dimmer>
  )
}
