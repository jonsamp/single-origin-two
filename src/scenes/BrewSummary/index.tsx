import * as StoreReview from 'expo-store-review'
import React, { useEffect, useLayoutEffect } from 'react'
import { View } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { StackActions } from '@react-navigation/native'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import { HeaderBackButton } from '@react-navigation/stack'
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
  route: any
}

const mapStateToProps = (state, props) => {
  const { timestamp } = props.route.params
  return {
    log: selectLog(state, timestamp),
  }
}

function BrewSummary(props: Props) {
  const {
    settings,
    settingUpdated,
    navigation,
    route,
    styleguide,
    theme,
  } = props

  const onBack = () => navigation.dispatch(StackActions.popToTop())

  useEffect(function didMount() {
    async function getStoreReview() {
      if ((await StoreReview.isAvailableAsync()) && !settings.submittedRating) {
        StoreReview.requestReview()
        settingUpdated({ setting: 'submittedRating', value: true })
      }
    }

    getStoreReview()
  }, [])

  useLayoutEffect(
    () => {
      navigation.setOptions({
        headerLeft: () => (
          <HeaderBackButton
            onPress={onBack}
            labelVisible={false}
            tintColor={theme.foreground}
          />
        ),
      })
    },
    [navigation]
  )

  const isMaxWidth = width >= styleguide.maxWidth

  return (
    <View style={{ flex: 1 }}>
      <Log timestamp={route.params.timestamp} withReminder />
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

export default connect(mapStateToProps)(withTheme(withSettings(BrewSummary)))
