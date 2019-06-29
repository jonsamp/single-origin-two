import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Sentry from 'sentry-expo'
import SignPainter from './src/app/assets/SignPainter-HouseScript.ttf'
import Navigator from './src/app/scenes/Navigator'
import configureStore from './src/app/store/configureStore'

const { store, persistor } = configureStore()

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = false

Sentry.config(
  'https://449ff87f0ab34a49831dac73cd695c4c@sentry.io/1327357'
).install()

interface AppState {
  isAppLoaded: boolean
}

class App extends Component<any, AppState> {
  state = {
    isAppLoaded: false,
  }

  loadFonts = async () => {
    await Font.loadAsync({
      SignPainter,
    })
  }

  render() {
    const { isAppLoaded } = this.state
    if (!isAppLoaded) {
      return (
        <AppLoading
          startAsync={this.loadFonts}
          onFinish={() => this.setState({ isAppLoaded: true })}
        />
      )
    }

    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <Navigator />
        {/* </PersistGate> */}
      </Provider>
    )
  }
}

export default App
