import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import withSettings from '@app/providers/settings';
import { logAdded } from '@app/state/logs/actions';
import Button from '@app/components/Button';
import { handleTick } from '@app/scenes/Brew/helpers';
import recipes from '@app/scenes/Brew/recipes';
import Preparation from './Preparation';
import YieldQuestion from './YieldQuestion';
import BoilWater from './BoilWater';
import GrindCoffee from './GrindCoffee';
import RecordBrewAttributes from './RecordBrewAttributes';
import PourTimer from './PourTimer';

const mapDispatchToProps = { logAdded };

class Recipe extends Component {
  static propTypes = {
    settings: PropTypes.object,
    unitHelpers: PropTypes.object,
    recipe: PropTypes.object,
    navigation: PropTypes.object,
    logAdded: PropTypes.func,
  };

  static defaultProps = {
    settings: {},
    unitHelpers: {},
    navigation: {},
  };

  state = {
    isLoaded: false,
    volumePercent: 0,
    grind: null,
    temp: 205,
    tip: {
      text: undefined,
    },
    warningText: undefined,
    timestamp: new Date().getTime(),
    totalBrewTime: 0,
    attributesRecorded: false,
  };

  componentWillMount() {
    const recipe = recipes[this.props.recipe.id]({
      settings: this.props.settings,
    });
    this.setState({
      ...recipe,
      isLoaded: true,
    });
  }

  setRecipeState = ({ key, value }) => this.setState({ [key]: value });

  onTick = second => {
    handleTick({
      pourEvents: this.state.pourEvents,
      tip: this.state.tip,
      totalVolume: this.state.totalVolume,
      waterVolumeUnit: this.props.unitHelpers.waterVolumeUnit,
      setState: this.setRecipeState,
      second,
    });
    this.setState({ totalBrewTime: second });
  };

  onFinish = () => {
    const { navigation, recipe, settings } = this.props;
    const {
      timestamp,
      totalVolume,
      grind,
      temp,
      totalBrewTime,
      attributesRecorded,
    } = this.state;
    const log = {
      timestamp,
      totalVolume,
      totalBrewTime,
      ratio: settings.ratio,
      ...(attributesRecorded && settings.recordGrind
        ? {
            grind:
              grind ||
              this.props.unitHelpers.grindUnit.getPreferredValueBasedOnPercent(
                this.state.defaultGrind
              ),
          }
        : null),
      ...(attributesRecorded && settings.recordTemp
        ? {
            temp,
          }
        : null),
      recipeId: recipe.id,
    };

    this.props.logAdded({ log });

    navigation.navigate('BrewSummary', { timestamp });
  };

  render() {
    const { settings, unitHelpers, recipe } = this.props;
    const {
      totalVolume,
      totalTime,
      temp,
      defaultGrind,
      grind,
      volumePercent,
      tip,
      warningText,
      isLoaded,
      pourSource,
      pourSourceDefault,
      minYield,
      maxYield,
    } = this.state;
    const { grindUnit, temperatureUnit } = unitHelpers;
    const coffeeWeight = Math.round(totalVolume / settings.ratio);

    if (!isLoaded) {
      return null;
    }

    return (
      <Fragment>
        <YieldQuestion
          totalVolume={totalVolume}
          setRecipeState={this.setRecipeState}
          minYield={minYield}
          maxYield={maxYield}
        />
        <Preparation recipe={recipe.title.toLowerCase()} />
        <BoilWater totalVolume={totalVolume} />
        <GrindCoffee
          coffeeWeight={coffeeWeight}
          defaultGrind={defaultGrind}
          title={recipe.title}
        />
        <RecordBrewAttributes
          setRecipeState={this.setRecipeState}
          defaultGrind={defaultGrind}
          grind={grind}
          temp={temp}
          grindUnit={grindUnit}
          temperatureUnit={temperatureUnit}
        />
        <PourTimer
          totalWaterWeight={totalVolume}
          waterPercent={volumePercent}
          onTick={this.onTick}
          source={pourSource}
          defaultSource={pourSourceDefault}
          totalTime={totalTime}
          totalVolume={totalVolume}
          tip={tip}
          warningText={warningText}
        />
        <Button
          title="Finish"
          customStyle={{ marginVertical: 16, paddingVertical: 20 }}
          onPress={this.onFinish}
        />
      </Fragment>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(withSettings(Recipe)));
