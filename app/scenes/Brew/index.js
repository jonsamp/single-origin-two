import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import withTheme from 'providers/theme';
import withSettings from 'providers/settings';
import recipes from 'constants/recipes';
import Header from 'components/Header';
import { BrewProvider } from './context';
import Recipe from './Recipe';

class Brew extends Component {
  static propTypes = {
    theme: PropTypes.object,
    navigation: PropTypes.object,
  };

  state = {
    containerWidth: 0,
  };

  render() {
    const { theme, navigation } = this.props;
    const { id } = navigation.state.params;
    const recipe = recipes[id];

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
        }}
      >
        <Header title={recipe.title} />
        <ScrollView
          contentContainerStyle={{
            padding: 12,
            alignItems: 'center',
            paddingTop: 32,
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
              <Recipe recipe={recipe} />
            </BrewProvider>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(withTheme(withSettings(Brew)));
