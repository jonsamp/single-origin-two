import React from 'react'
import { Text, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import Button from '../../components/Button'

interface OnboardingProps {
  navigation: NavigationScreenProp<any>
}

function Onboarding(props: OnboardingProps) {
  return (
    <View style={{ justifyContent: 'center', flex: 1 }}>
      <Text>Onboarding</Text>
      <Button title="Back" onPress={() => props.navigation.goBack()} />
    </View>
  )
}

export default withNavigation(Onboarding)
