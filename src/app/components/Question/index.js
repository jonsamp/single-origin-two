import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import withTheme from '@app/providers/theme'
import type from '@app/constants/type'

const propTypes = {
  theme: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
}

function Question({ title, description, theme }) {
  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          ...type.headline,
          color: theme.foreground,
        }}
      >
        {title}
      </Text>
      {description ? (
        <Text
          style={{
            ...type.callout,
            opacity: 0.9,
            color: theme.foreground,
            marginTop: 4,
          }}
        >
          {description}
        </Text>
      ) : null}
    </View>
  )
}

Question.propTypes = propTypes

export default withTheme(Question)
