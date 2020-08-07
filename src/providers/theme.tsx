import React, { Component } from 'react'
import { StatusBar, StatusBarStyle } from 'react-native'
import { Appearance } from 'react-native-appearance'
import { connect, useSelector } from 'react-redux'
import { lightTheme, darkTheme, styleguide } from '../constants/themes'
import { autoThemeUpdated, themeUpdated } from '../state/settings/actions'
import { selectSettings } from '../state/settings/selectors'
import { State } from '../state/types'
import { Theme as ThemeType } from '../types'

export type Theme = ThemeType

export interface Styleguide {
  iconSize: number
  maxWidth: number
}

interface WrapperProps {
  theme: 'default' | 'light' | 'dark'
  themeUpdated: (props: { theme: string }) => void
  autoThemeUpdated: (props: { autoTheme: boolean }) => void
  autoTheme: boolean
  [i: string]: any
}

const mapStateToProps = (state: State) => ({
  theme: selectSettings(state).theme,
  autoTheme: selectSettings(state).autoTheme,
})

const mapDispatchToProps = {
  themeUpdated,
  autoThemeUpdated,
}

export const useTheme = () => useSelector(mapStateToProps)

function withTheme(WrappedComponent) {
  class Wrapper extends Component<WrapperProps> {
    themeListener
    componentDidMount() {
      this.updateTheme({ colorScheme: Appearance.getColorScheme() })
      this.themeListener = Appearance.addChangeListener(({ colorScheme }) => {
        this.updateTheme({ colorScheme })
      })
    }

    componentWillUnmount() {
      if (this.themeListener && this.themeListener.remove) {
        this.themeListener.remove()
      }
    }

    updateTheme = ({ colorScheme }) => {
      const { theme, themeUpdated, autoTheme } = this.props
      if (autoTheme) {
        const scheme = colorScheme

        if (theme !== scheme) {
          themeUpdated({ theme: scheme })
        }
      }
    }

    toggleTheme = () => {
      const { theme, themeUpdated } = this.props
      themeUpdated({ theme: theme === 'dark' ? 'light' : 'dark' })
    }

    toggleAutoTheme = () => {
      const { autoTheme: currentAutoTheme, autoThemeUpdated } = this.props
      autoThemeUpdated({ autoTheme: !currentAutoTheme })
    }

    render() {
      const { theme, ...rest } = this.props
      const { colors } = theme === 'dark' ? darkTheme : lightTheme
      const statusBarTheme = theme === 'dark' ? 'light' : 'dark'

      StatusBar.setBarStyle(`${statusBarTheme}-content` as StatusBarStyle)

      return (
        <WrappedComponent
          {...rest}
          theme={colors}
          styleguide={styleguide}
          toggleTheme={this.toggleTheme}
          toggleAutoTheme={this.toggleAutoTheme}
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
