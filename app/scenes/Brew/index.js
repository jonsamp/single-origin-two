import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { startCase } from 'lodash';
import withTheme from 'providers/theme';
import withSettings from 'providers/settings';
import Header from 'components/Header';
import Button from 'components/Button';
import { BrewProvider } from './context';
import Recipe from './Recipe';

class Brew extends Component {
  static propTypes = {
    theme: PropTypes.object,
    recipe: PropTypes.string,
  };

  state = {
    containerWidth: 0,
  };

  // TODO:
  // control on finish and navigate to summary when ready

  render() {
    const { theme, recipe } = this.props;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
        }}
      >
        <Header title={startCase(recipe)} />
        <ScrollView
          contentContainerStyle={{
            padding: 12,
            alignItems: 'center',
          }}
        >
          <View
            style={{ width: '100%', maxWidth: 480 }}
            onLayout={event =>
              this.setState({
                containerWidth: event.nativeEvent.layout.width,
              })
            }
          >
            <BrewProvider value={this.state.containerWidth}>
              <Recipe id="KalitaWave" />
              <Button
                title="Finish"
                customStyle={{ marginVertical: 16, paddingVertical: 20 }}
              />
            </BrewProvider>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withTheme(withSettings(Brew));
