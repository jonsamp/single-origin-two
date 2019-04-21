import React, { Component } from 'react'
import Sentry from 'sentry-expo'
import { Provider } from 'react-redux'
import { Font, AppLoading } from 'expo'
// import EStyleSheet from 'react-native-extended-stylesheet'
import { PersistGate } from 'redux-persist/integration/react'
import Navigator from '@app/scenes/Navigator'
import SignPainter from './src/app/assets/SignPainter-HouseScript.ttf'
import configureStore from './src/app/store/configureStore'

const { store, persistor } = configureStore()

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = false

Sentry.config(
  'https://449ff87f0ab34a49831dac73cd695c4c@sentry.io/1327357'
).install()

class App extends Component {
  state = {
    isAppLoaded: false,
    shouldRender: true,
  }

  loadFonts = async () => {
    await Font.loadAsync({
      SignPainter,
    })
  }

  toggleTheme = () => {
    const theme =
      EStyleSheet.value('$theme') === 'light' ? darkTheme : lightTheme
    EStyleSheet.build(theme)

    darkTheme = 'something'

    // setState() called twice to re-render whole component tree
    this.setState({ shouldRender: false }, () =>
      this.setState({ shouldRender: true })
    )
  }

  render() {
    const { isAppLoaded, shouldRender } = this.state
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
        {shouldRender ? (
          <Navigator screenProps={{ toggleTheme: this.toggleTheme }} />
        ) : null}
        {/* </PersistGate> */}
      </Provider>
    )
  }
}

export default App
