import React, { Component } from 'react'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import InstructionalCard from '../../components/InstructionalCard'
import ResponsiveScrollView from '../../components/ResponsiveScrollView'
import withTheme, { Theme } from '../../providers/theme'
import { State } from '../../state/types'

interface PreparationProps {
  navigation: NavigationScreenProp<State>
  route: any
  theme: Theme
  isDarkTheme: boolean
  preparation: Array<{
    image?: number
    text: string
  }>
}

class Preparation extends Component<PreparationProps> {
  render() {
    const { navigation, route, theme, isDarkTheme } = this.props
    const preparation = route.params

    return (
      <ResponsiveScrollView
        wrapperStyle={{
          backgroundColor: isDarkTheme ? theme.background : theme.grey1,
        }}
      >
        {preparation.map(prepStep => (
          <InstructionalCard
            key={prepStep.text}
            step={{ image: prepStep.image, description: prepStep.text }}
          />
        ))}
      </ResponsiveScrollView>
    )
  }
}

export default withNavigation(withTheme(Preparation) as any)
