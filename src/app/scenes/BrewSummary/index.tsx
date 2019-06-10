import React, { Component } from 'react'
import { View } from 'react-native'
import {
  NavigationScreenProp,
  StackActions,
  withNavigation,
} from 'react-navigation'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Log from '../../components/Log'
import withTheme from '../../providers/theme'
import { selectLog } from '../../state/logs/selectors'
import { State } from '../../state/types'

interface BrewSummaryProps {
  navigation: NavigationScreenProp<State, any>
}

const mapStateToProps = (state, props) => {
  const { timestamp } = props.navigation.state.params
  return {
    log: selectLog(state, timestamp),
  }
}

class BrewSummary extends Component<BrewSummaryProps> {
  render() {
    const { navigation } = this.props
    const onBack = () => navigation.dispatch(StackActions.popToTop({}))
    return (
      <View style={{ flex: 1 }}>
        <Header title="Brew Summary" onBack={onBack} />
        <Log timestamp={navigation.state.params.timestamp} />
        <Button
          title="done"
          customStyle={{ paddingBottom: 32 }}
          onPress={onBack}
        />
      </View>
    )
  }
}

export default connect(mapStateToProps)(
  withNavigation(withTheme(BrewSummary) as any)
)
