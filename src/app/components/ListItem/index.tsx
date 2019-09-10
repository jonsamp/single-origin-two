import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
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
      <Card containerStyle={styles.cardContainer} style={styles.card}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: isDarkTheme ? theme.grey2 : theme.foreground,
            },
          ]}
        >
          {recipe.icon({
            fill: recipe.iced
              ? theme.blue
              : isDarkTheme
                ? theme.foreground
                : theme.background,
          })}
        </View>
        <View style={styles.bodyContainer}>
          <View>
            <Text
              style={{
                color: theme.foreground,
                ...type.headline,
              }}
            >
              {recipe.title} {recipe.modifier}
            </Text>
            {description && (
              <Text style={{ color: theme.foreground, ...type.caption }}>
                {description}
              </Text>
            )}
          </View>
          <Feather
            name="chevron-right"
            size={theme.iconSize}
            color={theme.foreground}
          />
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default withTheme(Item)
