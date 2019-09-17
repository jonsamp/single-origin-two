import React from 'react'
import { Text, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import Button from '../../components/Button'
import Header from '../../components/Header'
import withSettings from '../../providers/settings'

interface OnboardingProps {
  navigation: NavigationScreenProp<any>
  settingUpdated: (props: { setting: string; value: boolean }) => void
}

function Onboarding(props: OnboardingProps) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Get started" />
      <Text>Onboarding</Text>
      <Button
        title="Got it"
        onPress={() => {
          props.settingUpdated({ setting: 'onboardingVisible', value: false })
          props.navigation.goBack()
        }}
      />
    </View>
  )
}

export default withNavigation(withSettings(Onboarding) as any)
