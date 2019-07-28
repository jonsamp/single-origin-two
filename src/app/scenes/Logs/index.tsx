import { Feather } from '@expo/vector-icons'
import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import HeaderScrollView from 'react-native-header-scroll-view'
import { SwipeListView } from 'react-native-swipe-list-view'
import { connect } from 'react-redux'
import withTheme from '../../providers/theme'
import { logDeleted } from '../../state/logs/actions'
import { selectLogs } from '../../state/logs/selectors'
import { Log, Logs as LogsType, Theme } from '../../types/index'
import LogListItem from './LogListItem'
import styles from './styles'

interface LogsProps {
  theme: Theme
  logs: LogsType
  isDarkTheme: boolean
  logDeleted: (props: { timestamp: number }) => void
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
    const { theme, logs, isDarkTheme, logDeleted } = this.props
    console.log(logs)

    if (!logs || Object.keys(logs).length === 0) {
      return <View />
    }
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
            marginBottom: 20,
          }}
          scrollContainerStyle={{
            backgroundColor: modifiedTheme.grey1,
            paddingBottom: 32,
          }}
          fadeDirection="up"
        >
          <SwipeListView
            data={Object.values(logs)
              .filter(log => log)
              .sort(this.byTimestamp)}
            renderItem={props => <LogListItem {...props} />}
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
        </HeaderScrollView>
      </View>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Logs))
