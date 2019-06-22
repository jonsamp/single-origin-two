import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import Card from '../../../components/Card'
import recipes from '../../../constants/recipes'
import { Log } from '../../../types'

interface LogListItemProps {
  navigation: NavigationScreenProp<any>
  log: Log
}

function LogListItem(props: LogListItemProps) {
  return (
    <TouchableOpacity>
      <Card style={{ padding: 12, shadowOpacity: 0, marginBottom: 12 }}>
        <Text>{JSON.stringify(props.log)}</Text>
      </Card>
    </TouchableOpacity>
  )
}

export default withNavigation(LogListItem)
