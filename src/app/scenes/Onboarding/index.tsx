import React from 'react'
import { Text, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import Header from '../../components/Header'

interface OnboardingProps {
  navigation: NavigationScreenProp<any>
}

function Onboarding(props: OnboardingProps) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Get started" />
      <Text>Onboarding</Text>
    </View>
  )
}

export default withNavigation(Onboarding)
