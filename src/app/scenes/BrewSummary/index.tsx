import * as StoreReview from 'expo-store-review'
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
import withSettings, { Settings } from '../../providers/settings'
import withTheme from '../../providers/theme'
import { selectLog } from '../../state/logs/selectors'
import { State } from '../../state/types'
import styles from './styles'

interface BrewSummaryProps {
  navigation: NavigationScreenProp<State, any>
  settings: Settings
  settingUpdated: (props: { setting: string; value: any }) => void
}

const mapStateToProps = (state, props) => {
  const { timestamp } = props.navigation.state.params
  return {
    log: selectLog(state, timestamp),
  }
}

class BrewSummary extends Component<BrewSummaryProps> {
  componentDidMount() {
    const { settings, settingUpdated } = this.props
    if (StoreReview.isSupported() && !settings.submittedRating) {
      StoreReview.requestReview()
      settingUpdated({ setting: 'submittedRating', value: true })
    }
  }
  render() {
    const { navigation } = this.props
    const onBack = () => navigation.dispatch(StackActions.popToTop({}))
    return (
      <View style={{ flex: 1 }}>
        <Header title="Brew Summary" onBack={onBack} />
        <Log timestamp={navigation.state.params.timestamp} withReminder />
        <View style={styles.buttonContainer}>
          <Button title="done" customStyle={styles.button} onPress={onBack} />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps)(
  withNavigation(withTheme(withSettings(BrewSummary)) as any)
)
