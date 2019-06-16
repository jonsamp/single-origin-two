import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Header from '../../components/Header'
import Image from '../../components/Image'
import Instructions from '../../components/Instructions'
import withTheme from '../../providers/theme'
import { State } from '../../state/types'
import { Theme } from '../../types'

interface PreparationProps {
  navigation: NavigationScreenProp<State>
  theme: Theme
  preparation: Array<{
    image?: number
    text: string
  }>
}

class Preparation extends Component<PreparationProps> {
  render() {
    const { navigation, theme } = this.props
    const preparation = navigation.state.params

    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <Header title="Preparation" onBack={navigation.goBack} />
        <ScrollView style={{ paddingHorizontal: 16, paddingVertical: 32 }}>
          {preparation.map(prepStep => (
            <Card key={prepStep.text}>
              {prepStep.image ? <Image source={prepStep.image} /> : null}
              <Instructions text={prepStep.text} />
            </Card>
          ))}
        </ScrollView>
        <Button
          title="done"
          customStyle={{ paddingBottom: 32, borderRadius: 0 }}
          onPress={() => navigation.goBack()}
        />
      </View>
    )
  }
}

export default withNavigation(withTheme(Preparation) as any)
