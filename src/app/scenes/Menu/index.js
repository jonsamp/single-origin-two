import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import HeaderScrollView from 'react-native-header-scroll-view'
import { Feather } from '@expo/vector-icons'
import withTheme from '@app/providers/theme'
import withSettings from '@app/providers/settings'
import recipes from '@app/constants/recipes'
import type from '@app/constants/type'
import Card from '@app/components/Card'
import CleverIcon from '@app/constants/icons/CleverIcon'

const propTypes = {
  theme: PropTypes.object,
  navigation: PropTypes.object,
  isDarkTheme: PropTypes.bool,
  settings: PropTypes.object,
}

function Menu({ theme, navigation, isDarkTheme, settings }) {
  const modifiedTheme = isDarkTheme
    ? {
        ...theme,
        grey1: theme.background,
        grey2: theme.grey1,
      }
    : theme

  const selectedRecipes = Object.keys(settings.recipes).filter(
    v => settings.recipes[v]
  )
  const menuRecipes = Object.values(selectedRecipes).map(sr => recipes[sr])

  return (
    <HeaderScrollView
      title="Recipes"
      containerStyle={{ backgroundColor: modifiedTheme.grey1 }}
      headerComponentContainerStyle={{
        backgroundColor: modifiedTheme.grey1,
        borderBottomWidth: 1,
        borderBottomColor: modifiedTheme.grey2,
      }}
      headerComponentStyle={{
        backgroundColor: modifiedTheme.grey1,
      }}
      headlineStyle={{ color: modifiedTheme.foreground }}
      titleStyle={{
        color: modifiedTheme.foreground,
        marginBottom: 24,
      }}
      scrollContainerStyle={{
        backgroundColor: modifiedTheme.grey1,
        paddingBottom: 32,
      }}
      fadeDirection="up"
    >
      <View style={{ paddingHorizontal: 12 }}>
        {menuRecipes.map(recipe => (
          <Card key={recipe.id}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Brew', { id: recipe.id })}
              style={{ flexDirection: 'row' }}
              activeOpacity={0.8}
            >
              <View
                style={{
                  flex: 0.2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isDarkTheme ? theme.grey2 : theme.foreground,
                }}
              >
                {recipe.icon({
                  fill: isDarkTheme ? theme.foreground : theme.background,
                })}
              </View>
              <View
                style={{
                  padding: 20,
                  paddingVertical: 32,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flex: 0.8,
                }}
              >
                <Text
                  style={{
                    color: theme.foreground,
                    ...type.headline,
                  }}
                >
                  {recipe.title} {recipe.modifier}
                </Text>
                <Feather
                  name="chevron-right"
                  size={theme.iconSize}
                  color={theme.foreground}
                />
              </View>
            </TouchableOpacity>
          </Card>
        ))}
      </View>
    </HeaderScrollView>
  )
}

Menu.propTypes = propTypes

export default withSettings(withNavigation(withTheme(Menu)))