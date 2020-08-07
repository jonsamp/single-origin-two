import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import React from 'react'
import { Animated, Text, TouchableOpacity, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import recipes from '../../../constants/recipes'
import type from '../../../constants/type'
import withTheme from '../../../providers/theme'
import styles from './styles'

const RightActions = ({ dragX, onPress, theme }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.rightAction, { backgroundColor: '#FF3A3A' }]}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Feather
            name="trash-2"
            size={theme.iconSize + 8}
            color={theme.background}
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  )
}

const ListItem = ({ log, onPress, onRightPress, theme, isDarkTheme }) => {
  const recipe = recipes[log.recipeId]

  return (
    <Swipeable
      renderRightActions={(_, dragX) => (
        <RightActions dragX={dragX} onPress={onRightPress} theme={theme} />
      )}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={[
          styles.container,
          styles.displayHorizontal,
          { backgroundColor: isDarkTheme ? theme.grey2 : theme.background },
        ]}
      >
        <View style={[styles.displayHorizontal, { flex: 1 }]}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDarkTheme ? theme.grey1 : theme.foreground },
            ]}
          >
            {recipe.icon({
              fill: isDarkTheme ? theme.foreground : theme.background,
              size: 0.8,
            })}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[type.headline, { color: theme.foreground }]}>
              {recipe.title} {recipe.modifier}
            </Text>
            <Text
              style={[type.caption, { color: theme.foreground, opacity: 0.8 }]}
            >
              {format(log.timestamp, 'MMM D, YYYY @ h:mmA')}
            </Text>
            {log.notes ? (
              <Text
                numberOfLines={1}
                style={[
                  type.caption,
                  { color: theme.foreground, opacity: 0.8 },
                ]}
              >
                {log.notes}
              </Text>
            ) : null}
            {log.tastingNote ? (
              <Text
                style={[
                  type.caption,
                  { color: theme.foreground, opacity: 0.8 },
                ]}
              >
                Tasting note:{' '}
                {log.tastingNote.charAt(0).toUpperCase() +
                  log.tastingNote.toString().slice(1)}
              </Text>
            ) : null}
            {log.rating ? (
              <Text
                style={[
                  type.caption,
                  { color: theme.foreground, opacity: 0.8 },
                ]}
              >
                Rating: {log.rating}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={{ marginLeft: 16 }}>
          <Feather
            name="chevron-right"
            size={theme.iconSize}
            color={theme.foreground}
          />
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

export default withTheme(ListItem)
