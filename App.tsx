import { ScreenOrientation, SplashScreen } from 'expo'
import Constants from 'expo-constants'
import React, { Component } from 'react'
import { ActivityIndicator, View, Animated } from 'react-native'
import { AppearanceProvider } from 'react-native-appearance'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import * as Sentry from 'sentry-expo'
import * as Font from 'expo-font'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigator from './src/navigation'
import configureStore from './src/store/configureStore'
import { enableScreens } from 'react-native-screens'

enableScreens()

const { store, persistor } = configureStore()

Sentry.init({
  dsn: 'https://c9996743bbf04225a864e9b985a8be12@sentry.io/1746780',
  debug: true,
})

Sentry.setRelease(Constants.manifest.revisionId)

let customFonts = {
  Script: require('./assets/SignPainter-HouseScript.ttf'),
}

type State = {
  splashAnimationComplete: boolean
  splashAnimation: Animated.Value
  fontsLoaded: boolean
}

class App extends Component<null, State> {
  state = {
    splashAnimationComplete: false,
    splashAnimation: new Animated.Value(0),
    fontsLoaded: false,
  }

  async componentDidMount() {
    SplashScreen.preventAutoHide()

    this._loadFontsAsync()

    if (Constants.platform.ios.userInterfaceIdiom === 'tablet') {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.DEFAULT
      )
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts)
    this.setState({ fontsLoaded: true })
  }

  _maybeRenderLoadingImage = () => {
    if (this.state.splashAnimationComplete || !this.state.fontsLoaded) {
      return null
    }

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          opacity: this.state.splashAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
          transform: [
            {
              scale: this.state.splashAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.5],
              }),
            },
            {
              translateY: this.state.splashAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 4],
              }),
            },
          ],
        }}
      >
        <Animated.Image
          source={require('./assets/splash.png')}
          style={{
            width: undefined,
            height: undefined,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            resizeMode: 'contain',
          }}
          onLoadEnd={this._animateOut}
        />
      </Animated.View>
    )
  }

  _animateOut = () => {
    SplashScreen.hide()
    Animated.timing(this.state.splashAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ splashAnimationComplete: true })
    })
  }

  render() {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate
            loading={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'black',
                }}
              >
                <ActivityIndicator />
              </View>
            }
            persistor={persistor}
          >
            <AppearanceProvider>
              <Navigator />
              {this._maybeRenderLoadingImage()}
            </AppearanceProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    )
  }
}

export default App
