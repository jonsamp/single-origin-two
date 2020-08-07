import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import Card from '../../components/Card'
import type from '../../constants/type'
import withTheme from '../../providers/theme'
import { MenuItem, Theme } from '../../types/index'
import styles from './styles'

interface ItemProps {
  recipe: MenuItem
  theme: Theme
  isDarkTheme: boolean
  onPress?: () => void
  description?: string
  activeOpacity?: number
}

function Item(props: ItemProps) {
  const {
    theme,
    isDarkTheme,
    onPress,
    recipe,
    description,
    activeOpacity,
  } = props

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity || 0.8}>
      <Card containerStyle={styles.cardContainer}>
        <ImageBackground source={recipe.image} style={{ flex: 1, height: 160 }}>
          <View style={styles.bodyContainer}>
            <View>
              <Text
                style={{
                  color: 'white',
                  ...type.scriptTitle,
                }}
              >
                {recipe.title} {recipe.modifier ? `\n${recipe.modifier}` : ''}
              </Text>
              {description && (
                <Text style={{ color: theme.foreground, ...type.caption }}>
                  {description}
                </Text>
              )}
            </View>
            <View
              style={{
                padding: 8,
                backgroundColor: theme.primary,
                borderRadius: 100,
                bottom: 12,
              }}
            >
              <Feather
                name="arrow-right"
                size={theme.iconSize}
                color={theme.background}
                style={{ top: 1 }}
              />
            </View>
          </View>
        </ImageBackground>
      </Card>
    </TouchableOpacity>
  )
}

export default withTheme(Item)
