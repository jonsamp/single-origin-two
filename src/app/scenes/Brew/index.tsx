import Header from '@app/components/Header'
import recipes from '@app/constants/recipes'
import { Theme } from '@app/constants/themes'
import withSettings from '@app/providers/settings'
import withTheme from '@app/providers/theme'
import { State } from '@app/state/types'
import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import { BrewProvider } from './context'
import Recipe from './Recipe'

interface BrewProps {
  theme: Theme
  navigation: NavigationScreenProp<State, any>
}

interface BrewState {
  containerWidth: number
}

class Brew extends Component<BrewProps, BrewState> {
  state = {
    containerWidth: 0,
  }

  render() {
    const { theme, navigation } = this.props
    const { id } = navigation.state.params
    const recipe = recipes[id]

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
        }}
      >
        <Header title={recipe.title} />
        <ScrollView
          contentContainerStyle={{
            padding: 12,
            alignItems: 'center',
            paddingTop: 32,
          }}
        >
          <View
            style={{ width: '100%', maxWidth: 480 }}
            onLayout={event =>
              this.setState({
                containerWidth: event.nativeEvent.layout.width,
              })
            }
          >
            <BrewProvider value={this.state.containerWidth}>
              <Recipe recipe={recipe} />
            </BrewProvider>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default withNavigation(withSettings(withTheme(Brew)) as any)
