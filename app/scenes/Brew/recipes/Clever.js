import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SectionList, View, Text, ScrollView } from 'react-native';
import withTheme from 'providers/theme';
import withSettings from 'providers/settings';

import Card from 'components/Card';
import Instructions from 'components/Instructions';
import Question from 'components/Question';
import Image from 'components/Image';
import Warning from 'components/Warning';
import ScrollSelect from 'components/ScrollSelect';
import PourTimer from 'components/PourTimer';
import Tip from 'components/Tip';

import footerImage from 'assets/pour-over-bloom-default.jpg';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

class Clever extends Component {
  static propTypes = {
    theme: PropTypes.object,
    settings: PropTypes.object,
  };

  state = {
    currentWaterPercent: 0,
    coffeeWeight: 0,
    waterWeight: 0,
    tip: null,

    // TODO: make a function to generate this object
    waterLevels: {
      1: 0.1549,
      30: 1,
    },

    // TODO: make a function to generate this list
    brewTips: [
      {
        min: 1,
        max: 30,
        message: 'In **seconds** seconds pour up to **grams** grams.',
      },
    ],
  };

  ouncesToGrams = ounces => ounces * 28.3495;

  increaseWaterLevels = seconds => {
    const interval = this.state.waterLevels[seconds];

    if (interval) {
      this.setState({ currentWaterPercent: interval });
    }
  };

  setTip = seconds => {
    const { brewTips } = this.state;

    const tip = brewTips.find(t => seconds >= t.min && seconds < t.max);

    if (tip) {
      this.setState({
        tip: tip.message
          .replace('**seconds**', tip.max - seconds)
          .replace(
            '**grams**',
            `${Math.round(
              this.state.waterLevels[tip.max] * this.state.waterWeight
            )}`
          ),
      });
    } else {
      this.setState({ tip: null });
    }
  };

  handleCoffeeAmountSelected = ounces => {
    const waterWeight = this.ouncesToGrams(ounces);
    const coffeeWeight = waterWeight / 15;
    // const totalBrewTime = 340;

    this.setState({ waterWeight, coffeeWeight });
  };

  handleTick = s => {
    this.increaseWaterLevels(s);
    this.setTip(s);
  };

  render() {
    const { theme } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <ScrollView
          contentContainerStyle={{
            padding: 12,
            paddingTop: 90,
          }}
        >
          <Card>
            <Question
              title="How many cups would you like to brew? "
              description="One cup is typically 8oz."
            />
            <ScrollSelect
              min={8}
              max={20}
              defaultValue={12}
              label="ounces"
              onChange={this.handleCoffeeAmountSelected}
            />
          </Card>
          <View style={{ height: 64 }} />
          <Card>
            <Image source={footerImage} />
            <Instructions text="Grind **26 grams** of coffee, then brew over **3.5 minutes**." />
            <PourTimer
              totalWaterWeight={this.state.waterWeight}
              waterPercent={this.state.currentWaterPercent}
              onTick={this.handleTick}
            />
            <Tip text={this.state.tip} isVisible={!!this.state.tip} />
          </Card>
        </ScrollView>
      </View>
    );
  }
}

export default withSettings(withTheme(Clever));
