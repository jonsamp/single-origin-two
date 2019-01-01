import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import withTheme from 'providers/theme';
import playSound from 'helpers/playSound';
import Header from 'components/Header';
import addWaterSound from './sounds/add-water.mp3';
import tipSound from './sounds/tip.mp3';
import endBrewSound from './sounds/end-brew.mp3';
import warningSound from './sounds/warning.mp3';

import Clever from './recipes/Clever';

class Brew extends Component {
  static propTypes = {
    theme: PropTypes.object,
    recipe: PropTypes.string,
  };

  static defaultProps = {
    recipe: 'clever', // TODO: this will come from navigation state params eventually
  };

  state = {
    volumePercent: 0,
    totalVolume: 0,
    totalTime: 0,
    tip: {
      text: null,
    },
    warningText: null,
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

  render() {
    const { theme, recipe } = this.props;
    let renderRecipe;

    switch (recipe) {
      case 'clever':
        renderRecipe = props => <Clever {...props} />;
        break;
      default:
        renderRecipe = props => <Clever {...props} />;
        break;
    }

    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <Header title="Clever" />
        <ScrollView
          contentContainerStyle={{
            padding: 12,
            paddingTop: 90,
          }}
        >
          {renderRecipe({
            setRecipeState: this.setRecipeState,
            handleTick: this.handleTick,
            ...this.state,
          })}
        </ScrollView>
      </View>
    );
  }
}

export default withTheme(Brew);
