import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import Button from '../../components/Button'
import Header from '../../components/Header'
import withTheme from '../../providers/theme'
import { State } from '../../state/types'

interface PreparationProps {
  navigation: NavigationScreenProp<State>
}

class Preparation extends Component<PreparationProps> {
  render() {
    const { navigation, ...rest } = this.props
    return (
      <View style={{ flex: 1 }}>
        <Header title="Preparation" onBack={navigation.goBack} />
        <View>
          <Text>Preparations!</Text>
          <Text>Preparations!</Text>
          <Text>Preparations!</Text>
          <Text>{JSON.stringify(navigation, null, 2)}</Text>
          <Text>Preparations!</Text>
          <Text>Preparations!</Text>
          <Text>Preparations!</Text>
          <Text>Preparations!</Text>
        </View>
        <Button
          title="done"
          customStyle={{ paddingBottom: 32 }}
          onPress={() => navigation.goBack()}
        />
      </View>
    )
  }
}

export default withNavigation(withTheme(Preparation) as any)
