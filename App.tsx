import * as ScreenOrientation from 'expo-screen-orientation'
import Constants from 'expo-constants'
import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { AppearanceProvider } from 'react-native-appearance'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import * as Sentry from 'sentry-expo'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import Navigator from './src/navigation'
import configureStore from './src/store/configureStore'
import { enableScreens } from 'react-native-screens'
import { useCachedResources } from './src/hooks/useCachedResources'

enableScreens()

const { store, persistor } = configureStore()

Sentry.init({
  dsn: 'https://c9996743bbf04225a864e9b985a8be12@sentry.io/1746780',
  enableInExpoDevelopment: true,
  debug: false,
})

export default function App() {
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

  const isLoadingComplete = useCachedResources()

  return (
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
            <ActivityIndicator color="white" />
          </View>
        }
        persistor={persistor}
      >
        <SafeAreaProvider>
          <AppearanceProvider>
            {isLoadingComplete ? (
              <Navigator />
            ) : (
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
            )}
          </AppearanceProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}
