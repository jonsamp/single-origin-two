import React, { Component } from 'react'
import Log from '../../components/Log'

type Props = {
  timestamp: number
  route: {
    params: {
      timestamp: number
    }
  }
}

function LogDetail(props: Props) {
  const { route } = props
  const timestamp = route.params && route.params.timestamp

  return <Log timestamp={timestamp} />
}

export default LogDetail
