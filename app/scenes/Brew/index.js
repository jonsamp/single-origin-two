import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { startCase } from 'lodash';
import withTheme from 'providers/theme';
import withSettings from 'providers/settings';
import Header from 'components/Header';
import Button from 'components/Button';
import Clever from './Clever';
import { BrewProvider } from './context';

const mapStateToProps = state => ({
  // prevGrindSetting: 15, // TODO: select from the previous most recent brew of this recipe
});

class Brew extends Component {
  static propTypes = {
    theme: PropTypes.object,
    recipe: PropTypes.string,
  };

  static defaultProps = {
    recipe: 'clever', // TODO: this will come from navigation state params eventually
  };

  state = {
    containerWidth: 0,
  };

  renderRecipe = recipe => {
    const recipes = {
      clever: Clever,
    };

    return recipes[recipe];
  };

  render() {
    const { theme, recipe } = this.props;
    const Recipe = this.renderRecipe(recipe);

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
            style={{ width: '100%', maxWidth: 560 }}
            onLayout={event =>
              this.setState({
                containerWidth: event.nativeEvent.layout.width,
              })
            }
          >
            <BrewProvider value={this.state.containerWidth}>
              <Recipe />
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

export default connect(mapStateToProps)(withTheme(withSettings(Brew)));
