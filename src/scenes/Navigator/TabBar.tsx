import React, { Component } from 'react'
import { BottomTabBar } from 'react-navigation-tabs'
import withTheme from '../../providers/theme'
import { Theme } from '../../types/index'

interface TabBarProps {
  props: any
  theme: Theme
  isDarkTheme: boolean
}

class TabBar extends Component<TabBarProps> {
  render() {
    const { theme, isDarkTheme } = this.props

    return (
      <BottomTabBar
        {...this.props}
        style={{
          backgroundColor: isDarkTheme ? theme.grey2 : theme.background,
          borderTopWidth: 0,
        }}
      />
    )
  }
}

export default withTheme(TabBar)
