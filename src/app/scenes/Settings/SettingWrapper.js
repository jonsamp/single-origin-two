import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import withTheme from '@app/providers/theme'
import styles from './styles'

const propTypes = {
  children: PropTypes.node,
  theme: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  borderTop: PropTypes.bool,
  isDarkTheme: PropTypes.bool,
}

const SettingWrapper = ({
  children,
  theme,
  title,
  description,
  borderTop,
  isDarkTheme,
}) => (
  <View
    style={{ backgroundColor: isDarkTheme ? theme.background : theme.grey1 }}
  >
    <View
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: isDarkTheme ? theme.background : theme.grey2,
        backgroundColor: isDarkTheme ? theme.grey2 : theme.background,
        borderTopWidth: borderTop ? 1 : 0,
        borderTopColor: theme.grey2,
      }}
    >
      <View style={styles.row}>
        <Text
          style={[
            styles.title,
            { color: theme.foreground, textTransform: 'capitalize' },
          ]}
        >
          {title}
        </Text>
        {children}
      </View>
    </View>
    {description ? (
      <View
        style={{
          padding: 16,
          paddingBottom: 32,
        }}
      >
        <Text style={[styles.description, { color: theme.foreground }]}>
          {description}
        </Text>
      </View>
    ) : null}
  </View>
)

SettingWrapper.propTypes = propTypes

export default withTheme(SettingWrapper)