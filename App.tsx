import * as ScreenOrientation from 'expo-screen-orientation'
import Constants from 'expo-constants'
import React, { useState, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'

import { AppearanceProvider } from 'react-native-appearance'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import * as Sentry from 'sentry-expo'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import * as Font from 'expo-font'

import Navigator from './src/navigation'
import configureStore from './src/store/configureStore'
import { enableScreens } from 'react-native-screens'

enableScreens()

const { store, persistor } = configureStore()

Sentry.init({
  dsn: 'https://c9996743bbf04225a864e9b985a8be12@sentry.io/1746780',
  enableInExpoDevelopment: false,
  debug: false,
})

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(
    function onLoadedUpdate() {
      if (isLoaded) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 666,
          useNativeDriver: true,
        }).start()
      }
    },
    [isLoaded]
  )

  async function loadResourcesAndDataAsync() {
    try {
      if (
        Constants.platform &&
        Constants.platform.ios &&
        Constants.platform.ios.userInterfaceIdiom === 'tablet'
      ) {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.DEFAULT
        )
      }

      await Font.loadAsync({
        Script: require('./assets/SignPainter-HouseScript.ttf'),
      })
    } catch (e) {
      console.warn(e)
    } finally {
      return
    }
  }

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider
          style={{ backgroundColor: 'black' }}
          initialMetrics={initialWindowMetrics}
        >
          <AppearanceProvider>
            {isLoaded ? (
              <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
                <Navigator />
              </Animated.View>
            ) : (
              <AppLoading
                startAsync={loadResourcesAndDataAsync}
                onFinish={() => setIsLoaded(true)}
                onError={console.warn}
              />
            )}
          </AppearanceProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}
