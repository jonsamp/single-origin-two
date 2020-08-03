import * as StoreReview from 'expo-store-review'
import React, { Component } from 'react'
import { View } from 'react-native'
import { NavigationScreenProp, StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Log from '../../components/Log'
import { width } from '../../constants/layout'
import withSettings, { Settings } from '../../providers/settings'
import withTheme, { Styleguide } from '../../providers/theme'
import { selectLog } from '../../state/logs/selectors'
import { State } from '../../state/types'
import styles from './styles'

interface BrewSummaryProps {
  navigation: NavigationScreenProp<State, any>
  settings: Settings
  settingUpdated: (props: { setting: string; value: any }) => void
  styleguide: Styleguide
}

const mapStateToProps = (state, props) => {
  const { timestamp } = props.navigation.state.params
  return {
    log: selectLog(state, timestamp),
  }
}

class BrewSummary extends Component<BrewSummaryProps> {
  async componentDidMount() {
    const { settings, settingUpdated } = this.props
    if ((await StoreReview.isAvailableAsync()) && !settings.submittedRating) {
      StoreReview.requestReview()
      settingUpdated({ setting: 'submittedRating', value: true })
    }
  }

  render() {
    const { navigation, styleguide } = this.props
    const onBack = () => navigation.dispatch(StackActions.popToTop({}))
    const isMaxWidth = width >= styleguide.maxWidth

    return (
      <View style={{ flex: 1 }}>
        <Header title="Brew Summary" onBack={onBack} />
        <Log timestamp={navigation.state.params.timestamp} withReminder />
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <SafeAreaView
            edges={['bottom']}
            style={[
              styles.buttonContainer,
              isMaxWidth && {
                width: styleguide.maxWidth,
              },
            ]}
          >
            <Button
              title="done"
              type="tertiary"
              customStyle={styles.button}
              onPress={onBack}
            />
          </SafeAreaView>
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps)(withTheme(withSettings(BrewSummary)))
