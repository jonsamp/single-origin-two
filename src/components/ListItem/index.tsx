import React from 'react'
import { Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import Card from '../../components/Card'
import type from '../../constants/type'
import withTheme from '../../providers/theme'
import { MenuItem, Theme } from '../../types/index'
import { height } from '../../constants/layout'
import { ArrowIcon } from './icons/ArrowIcon'

interface ItemProps {
  recipe: MenuItem
  theme: Theme
  onPress?: () => void
  description?: string
  activeOpacity?: number
}

function Item(props: ItemProps) {
  const { theme, onPress, recipe, description, activeOpacity } = props

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity || 0.8}
      style={{
        flex: 1,
        marginBottom: 32,
      }}
    >
      <View
        style={{
          shadowRadius: 10,
          shadowOffset: { height: 6, width: 0 },
          shadowOpacity: 0.5,
          minHeight: 180,
          maxHeight: 240,
        }}
      >
        <ImageBackground
          source={recipe.image}
          style={{
            minHeight: 180,
            maxHeight: 240,
            borderRadius: 12,
            height: height / 4,
            elevation: 10,
            backgroundColor: 'black',
            overflow: 'hidden',
          }}
          imageStyle={{
            minHeight: 180,
            maxHeight: 240,
            opacity: 0.65,
          }}
        >
          <View style={{ marginTop: 20, marginLeft: 20 }}>
            <Text
              style={{
                color: 'white',
                ...type.scriptTitle,
              }}
            >
              {recipe.title}
            </Text>
            <Text
              style={{
                color: 'white',
                ...type.subheader,
                fontWeight: '400',
              }}
            >
              {recipe.modifier}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: theme.primary,
              margin: 20,
              borderRadius: 30,
            }}
          >
            <ArrowIcon color={theme.background} />
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

export default withTheme(Item)
