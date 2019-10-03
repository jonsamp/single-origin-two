import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import Header from '../../components/Header'
import InstructionalCard from '../../components/InstructionalCard'
import { width } from '../../constants/layout'
import withTheme, { Styleguide, Theme } from '../../providers/theme'
import { State } from '../../state/types'

interface PreparationProps {
  navigation: NavigationScreenProp<State>
  theme: Theme
  isDarkTheme: boolean
  preparation: Array<{
    image?: number
    text: string
  }>
  styleguide: Styleguide
}

class Preparation extends Component<PreparationProps> {
  render() {
    const { navigation, theme, isDarkTheme, styleguide } = this.props
    const preparation = navigation.state.params
    const isMaxWidth = width >= styleguide.maxWidth

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkTheme ? theme.background : theme.grey1,
        }}
      >
        <Header title="Preparation" onBack={navigation.goBack} />
        <View style={isMaxWidth && { alignItems: 'center' }}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 32,
              paddingBottom: 60,
              ...(isMaxWidth && { width: styleguide.maxWidth }),
            }}
          >
            {preparation.map(prepStep => (
              <InstructionalCard
                key={prepStep.text}
                step={{ image: prepStep.image, description: prepStep.text }}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default withNavigation(withTheme(Preparation) as any)
