import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'
import HeaderScrollView from 'react-native-header-scroll-view'
import { SwipeListView } from 'react-native-swipe-list-view'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import ListItem from '../../components/ListItem'
import ScreenPlaceholder from '../../components/ScreenPlaceholder'
import recipes from '../../constants/recipes'
import withTheme from '../../providers/theme'
import { logDeleted } from '../../state/logs/actions'
import { selectLogs } from '../../state/logs/selectors'
import { Log, Logs as LogsType, Theme } from '../../types/index'
import styles from './styles'

interface LogsProps {
  theme: Theme
  logs: LogsType
  isDarkTheme: boolean
  logDeleted: (props: { timestamp: number }) => void
  navigation: NavigationScreenProp<any>
}

interface LogsState {
  editing: boolean
}

const mapStateToProps = state => ({
  logs: selectLogs(state),
})

const mapDispatchToProps = { logDeleted }

class Logs extends Component<LogsProps, LogsState> {
  state = { editing: false }

  toggleEditing = () => this.setState(prev => ({ editing: !prev.editing }))

  byTimestamp = (a, b) => b.timestamp - a.timestamp

  render() {
    const { theme, logs, isDarkTheme, logDeleted, navigation } = this.props
    const modifiedTheme = isDarkTheme
      ? {
          ...theme,
          grey1: theme.background,
          grey2: theme.grey2,
        }
      : theme

    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <HeaderScrollView
          title="Logs"
          containerStyle={{ backgroundColor: modifiedTheme.grey1 }}
          headerComponentContainerStyle={{
            backgroundColor: isDarkTheme
              ? modifiedTheme.grey2
              : theme.background,
          }}
          headerComponentStyle={{
            backgroundColor: modifiedTheme.grey1,
          }}
          headlineStyle={{ color: modifiedTheme.foreground }}
          titleStyle={{
            color: modifiedTheme.foreground,
            marginBottom: 24,
            marginLeft: 0,
          }}
          scrollContainerStyle={{
            backgroundColor: modifiedTheme.grey1,
            paddingBottom: 32,
            paddingHorizontal: 12,
          }}
          fadeDirection="up"
        >
          {logs && Object.keys(logs).length ? (
            <SwipeListView
              data={Object.values(logs)
                .filter(log => log)
                .sort(this.byTimestamp)}
              renderItem={props => {
                const { item: log } = props
                const recipe = recipes[log.recipeId]
                return (
                  <ListItem
                    recipe={recipe}
                    onPress={() =>
                      navigation.navigate('LogDetail', {
                        timestamp: log.timestamp,
                      })
                    }
                    description={format(log.timestamp, 'MM/DD @ h:mmA')}
                    activeOpacity={1}
                  />
                )
              }}
              renderHiddenItem={data => (
                <TouchableOpacity
                  onPress={() => logDeleted({ timestamp: data.item.timestamp })}
                >
                  <View style={styles.behindRowContainer}>
                    <Feather
                      name="trash-2"
                      size={theme.iconSize}
                      color={theme.background}
                    />
                  </View>
                </TouchableOpacity>
              )}
              extraData={this.state}
              keyExtractor={(item: Log) => String(item.timestamp)}
              rightOpenValue={-75}
            />
          ) : (
            <ScreenPlaceholder text="Logs of your brews will appear here once you complete a brew." />
          )}
        </HeaderScrollView>
      </View>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(withTheme(Logs) as any))
