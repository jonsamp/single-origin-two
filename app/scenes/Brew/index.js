import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { startCase } from 'lodash';
import withTheme from 'providers/theme';
import playSound from 'helpers/playSound';
import Header from 'components/Header';
import Button from 'components/Button';
import addWaterSound from './sounds/add-water.mp3';
import tipSound from './sounds/tip.mp3';
import endBrewSound from './sounds/end-brew.mp3';
import warningSound from './sounds/warning.mp3';
import Clever from './recipes/Clever';

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
    pourEvents: [],
    volumePercent: undefined,
    totalVolume: undefined,
    totalTime: undefined,
    grind: undefined,
    temp: undefined,
    tip: {
      text: undefined,
    },
    warningText: undefined,
  };

  setRecipeState = ({ key, value }) => this.setState({ [key]: value });

  formatTipText = ({ text, secondsLeft, volumePercent }) =>
    text
      .replace('**seconds**', secondsLeft)
      .replace('**grams**', volumePercent * this.state.totalVolume);

  handleTick = s => {
    const currentEvents = this.state.pourEvents[s];

    if (this.state.tip.text) {
      if (this.state.tip.countDownTo === s) {
        this.setState({ tip: { text: null } });
      } else {
        this.setState(prevState => {
          const { tip } = prevState;
          return {
            tip: {
              ...tip,
              text: this.formatTipText({
                text: tip.template,
                secondsLeft: tip.countDownTo - s,
                volumePercent: tip.volumePercent,
              }),
            },
          };
        });
      }
    }

    if (!currentEvents) return;

    currentEvents.forEach(event => {
      switch (event.type) {
        case 'increaseWaterLevel':
          playSound({ sound: addWaterSound });
          this.setState({ volumePercent: event.volumePercent });
          break;
        case 'tip':
          playSound({ sound: tipSound });
          this.setState({
            tip: {
              template: event.text,
              text: this.formatTipText({
                text: event.text,
                secondsLeft: event.countDownTo - s,
                volumePercent: event.volumePercent,
              }),
              volumePercent: event.volumePercent,
              countDownTo: event.countDownTo,
            },
          });
          break;
        case 'finished':
          playSound({ sound: endBrewSound });
          break;
        case 'warning':
          playSound({ sound: warningSound });
          this.setState({ warningText: event.text });
          break;
        default:
      }
    });
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
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <Header title={startCase(recipe)} />
        <ScrollView
          contentContainerStyle={{
            padding: 12,
          }}
        >
          <Recipe
            setRecipeState={this.setRecipeState}
            handleTick={this.handleTick}
            totalVolume={this.state.totalVolume}
            tip={this.state.tip}
            warningText={this.state.warningText}
            volumePercent={this.state.volumePercent}
            totalTime={this.state.totalTime}
            temp={this.state.temp}
            grind={this.state.grind}
          />
          <Button
            title="Finish"
            customStyle={{ marginVertical: 32, paddingVertical: 20 }}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps)(withTheme(Brew));
