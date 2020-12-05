import * as ScreenOrientation from 'expo-screen-orientation'
import Constants from 'expo-constants'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
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
  enableInExpoDevelopment: true,
  debug: false,
})

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(function didMount() {
    async function modifyOrientation() {
      if (
        Constants.platform &&
        Constants.platform.ios &&
        Constants.platform.ios.userInterfaceIdiom === 'tablet'
      ) {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.DEFAULT
        )
      }
    }

    modifyOrientation()
  }, [])

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          Script: require('./assets/SignPainter-HouseScript.ttf'),
        })
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setIsLoaded(true)
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  const loadingComponent = (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <ActivityIndicator color="white" />
    </View>
  )

  if (!isLoaded) {
    return loadingComponent
  }

  return (
    <Provider store={store}>
      <PersistGate loading={loadingComponent} persistor={persistor}>
        <SafeAreaProvider
          style={{ backgroundColor: 'black' }}
          initialMetrics={initialWindowMetrics}
        >
          <AppearanceProvider>
            {isLoaded ? <Navigator /> : loadingComponent}
          </AppearanceProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}
