import React, { Component } from 'react';
import Sentry from 'sentry-expo';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';
import { PersistGate } from 'redux-persist/integration/react';
import SignPainter from './app/assets/SignPainter-HouseScript.ttf';
import configureStore from './app/store/configureStore';
import Navigator from 'scenes/Navigator';

const { store, persistor } = configureStore();

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = false;

Sentry.config(
  'https://449ff87f0ab34a49831dac73cd695c4c@sentry.io/1327357'
).install();

class App extends Component {
  state = {
    appIsLoaded: false,
  };

  loadFonts = async () => {
    await Font.loadAsync({
      SignPainter,
    });
  };

  render() {
    if (!this.state.appIsLoaded) {
      return (
        <AppLoading
          startAsync={this.loadFonts}
          onFinish={() => this.setState({ appIsLoaded: true })}
        />
      );
    }

    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <Navigator />
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

export default App;
