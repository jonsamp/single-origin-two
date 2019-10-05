import { ScreenOrientation } from 'expo'
import Constants from 'expo-constants'
import React, { Component } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { AppearanceProvider } from 'react-native-appearance'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import * as Sentry from 'sentry-expo'
import Navigator from './src/app/scenes/Navigator'
import configureStore from './src/app/store/configureStore'

const { store, persistor } = configureStore()

Sentry.init({
  dsn: 'https://c9996743bbf04225a864e9b985a8be12@sentry.io/1746780',
  debug: true,
})

Sentry.setRelease(Constants.manifest.revisionId)

class App extends Component {
  async componentDidMount() {
    if (Constants.platform.ios.userInterfaceIdiom === 'tablet') {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.DEFAULT
      )
    }
  }

  render() {
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
              <ActivityIndicator />
            </View>
          }
          persistor={persistor}
        >
          <AppearanceProvider>
            <Navigator />
          </AppearanceProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
