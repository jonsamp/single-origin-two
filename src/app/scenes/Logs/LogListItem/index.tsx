import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import Card from '../../../components/Card'
import recipes from '../../../constants/recipes'
import type from '../../../constants/type'
import withTheme from '../../../providers/theme'
import { Log, Theme } from '../../../types'

interface LogListItemProps {
  navigation: NavigationScreenProp<any>
  theme: Theme
  isDarkTheme: boolean
  item: Log
}

function LogListItem(props: LogListItemProps) {
  const { navigation, item: log, isDarkTheme, theme } = props

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('LogDetail', { timestamp: log.timestamp })
      }
      style={{ marginHorizontal: 12 }}
    >
      <Card
        style={{ shadowOpacity: 0, flexDirection: 'row' }}
        containerStyle={{ shadowOpacity: 0, marginBottom: 24 }}
      >
        <View
          style={{
            backgroundColor: isDarkTheme ? theme.grey2 : theme.foreground,
            alignItems: 'center',
            width: 60,
            paddingTop: 22,
          }}
        >
          {recipes[log.recipeId].icon({
            fill: isDarkTheme ? theme.foreground : theme.background,
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
            paddingRight: 16,
          }}
        >
          <View style={{ padding: 16 }}>
            <Text style={{ color: theme.foreground, ...type.headline }}>
              {recipes[log.recipeId].title} {recipes[log.recipeId].modifier}
            </Text>
            <Text style={{ color: theme.foreground, ...type.caption }}>
              {format(log.timestamp, 'MM/DD @ h:mmA')}
            </Text>
          </View>
          <Feather
            name="chevron-right"
            size={theme.iconSize}
            color={theme.foreground}
          />
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default connect()(withTheme(withNavigation(LogListItem)) as any)
