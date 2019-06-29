import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import ScrollSelect from '../../components/ScrollSelect'
import type from '../../constants/type'
import withTheme from '../../providers/theme'
import { logDeleted, logUpdated } from '../../state/logs/actions'
import { selectLog } from '../../state/logs/selectors'
import { Log } from '../../state/logs/types'
import { State } from '../../state/types'
import { Theme } from '../../types'

interface LogDetailEditProps {
  navigation: NavigationScreenProp<State>
  theme: Theme
  timestamp: number
  isDarkTheme: boolean
  logUpdated: (props: { timestamp: number; log: any }) => void
  logDeleted: (props: { timestamp: number }) => void
  log: Log
}

interface LogDetailEditState {
  rating?: number
}

const mapStateToProps = (state, props) => ({
  log: selectLog(state, props.navigation.state.params.timestamp),
})

const mapDispatchToProps = {
  logUpdated,
  logDeleted,
}

class LogDetailEdit extends Component<LogDetailEditProps, LogDetailEditState> {
  state = {}

  onDelete = () => {
    this.props.logDeleted({
      timestamp: this.props.navigation.state.params.timestamp,
    })

    this.props.navigation.goBack()
  }

  onSave = () => {
    this.props.logUpdated({
      timestamp: this.props.navigation.state.params.timestamp,
      log: {},
    })

    this.props.navigation.goBack()
  }

  render() {
    const {
      navigation,
      theme,
      isDarkTheme,
      log,
      logUpdated,
      logDeleted,
    } = this.props
    const { timestamp } = navigation.state.params

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkTheme ? theme.background : theme.grey1,
          padding: 12,
        }}
      >
        <Text style={type.header}>Update Log</Text>
        <Text style={type.header}>Rate this brew</Text>
        <ScrollSelect
          min={1}
          max={10}
          defaultValue={5}
          label="RATING"
          onChange={value => this.setState({ rating: value })}
          step={1}
        />
        <Button onPress={this.onSave} title="Save" />
      </View>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(withTheme(LogDetailEdit) as any))
