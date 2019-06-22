import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import Card from '../../../components/Card'
import recipes from '../../../constants/recipes'
import withTheme from '../../../providers/theme'
import { Log, Theme } from '../../../types'

interface LogListItemProps {
  navigation: NavigationScreenProp<any>
  theme: Theme
  item: Log
}

function LogListItem(props: LogListItemProps) {
  const { navigation, item: log } = props

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('LogDetail', { timestamp: log.timestamp })
      }
    >
      <Card style={{ padding: 12, shadowOpacity: 0, marginBottom: 12 }}>
        <Text>{JSON.stringify(log)}</Text>
        <Text>{JSON.stringify(recipes[log.recipeId])}</Text>
      </Card>
    </TouchableOpacity>
  )
}

export default connect()(withTheme(withNavigation(LogListItem)) as any)
