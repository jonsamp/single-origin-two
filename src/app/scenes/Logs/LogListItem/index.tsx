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
      activeOpacity={0.8}
    >
      <Card
        style={{
          shadowOpacity: 0,
          flexDirection: 'row',
          backgroundColor: isDarkTheme ? theme.grey1 : theme.background,
        }}
        containerStyle={{ shadowOpacity: 0, marginTop: 24, marginBottom: 0 }}
      >
        <View
          style={{
            backgroundColor: isDarkTheme ? theme.grey2 : theme.foreground,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 0.2,
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
            flex: 0.8,
            padding: 20,
            paddingVertical: 16,
          }}
        >
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  color: theme.foreground,
                  ...type.headline,
                  marginRight: 8,
                }}
              >
                {recipes[log.recipeId].title} {recipes[log.recipeId].modifier}
              </Text>
              {log.rating ? (
                <View
                  style={{
                    backgroundColor: theme.grey2,
                    paddingVertical: 1,
                    paddingHorizontal: 8,
                    borderRadius: 2,
                    justifyContent: 'center',
                    top: 1,
                  }}
                >
                  <Text style={{ color: theme.foreground }}>{log.rating}</Text>
                </View>
              ) : null}
            </View>
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
