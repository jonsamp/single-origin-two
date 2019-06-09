import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import Header from '../../components/Header'
import recipes from '../../constants/recipes'
import { Theme } from '../../constants/themes'
import withSettings from '../../providers/settings'
import withTheme from '../../providers/theme'
import { State } from '../../state/types'
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
            <Recipe recipe={recipe} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default withNavigation(withSettings(withTheme(Brew)) as any)
