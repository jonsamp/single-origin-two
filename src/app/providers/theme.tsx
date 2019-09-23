import React, { Component } from 'react'
import { StatusBar, StatusBarStyle } from 'react-native'
import { connect } from 'react-redux'
import themes from '../constants/themes'
import { themeUpdated } from '../state/settings/actions'
import { selectSettings } from '../state/settings/selectors'
import { State } from '../state/types'
import { Theme as ThemeType } from '../types'

export type Theme = ThemeType

interface WrapperProps {
  theme: 'default' | 'light' | 'dark'
  themeUpdated: (props: { theme: string }) => void
  [i: string]: any
}

const mapStateToProps = (state: State) => ({
  theme: selectSettings(state).theme,
})

const mapDispatchToProps = {
  themeUpdated,
}

function withTheme(WrappedComponent) {
  class Wrapper extends Component<WrapperProps> {
    toggleTheme = () => {
      const { theme, themeUpdated } = this.props
      themeUpdated({ theme: theme === 'dark' ? 'light' : 'dark' })
    }

    render() {
      const { theme, ...rest } = this.props
      const statusBarTheme = theme === 'dark' ? 'light' : 'dark'
      StatusBar.setBarStyle(`${statusBarTheme}-content` as StatusBarStyle)
      return (
        <WrappedComponent
          {...rest}
          theme={themes[this.props.theme]}
          defaultTheme={themes.default}
          toggleTheme={this.toggleTheme}
          isDarkTheme={this.props.theme === 'dark'}
          isLightTheme={this.props.theme === 'light'}
        />
      )
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapper)
}

export default withTheme
