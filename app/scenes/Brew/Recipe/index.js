import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import withSettings from 'providers/settings';
import formatSeconds from 'helpers/formatSeconds';
import { logAdded } from 'state/logs/actions';
import Button from 'components/Button';
import Card from 'components/Card';
import Image from 'components/Image';
import Instructions from 'components/Instructions';
import { handleTick } from 'scenes/Brew/helpers';
import recipes from 'scenes/Brew/recipes';
import Warning from './Warning';
import Tip from './Tip';
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
    const { timestamp, totalVolume, grind, temp, totalBrewTime } = this.state;
    const log = {
      timestamp,
      totalVolume,
      temp,
      totalBrewTime,
      ratio: settings.ratio,
      grind:
        grind ||
        this.props.unitHelpers.grindUnit.getPreferredValueBasedOnPercent(
          this.state.defaultGrind
        ),
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
    const { waterVolumeUnit, grindUnit, temperatureUnit } = unitHelpers;
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
        <Card>
          <Image source={pourSource} defaultSource={pourSourceDefault} />
          <Instructions
            text={`Pour a total of **${Math.round(
              waterVolumeUnit.getPreferredValue(totalVolume)
            )} ${
              waterVolumeUnit.unit.title
            }** of water over the next **${formatSeconds(
              totalTime
            )}** with the pour timer.`}
          />
          <PourTimer
            totalWaterWeight={totalVolume}
            waterPercent={volumePercent}
            onTick={this.onTick}
          />
          <Tip text={tip.text} isVisible={!!tip.text} />
          <Warning text={warningText} isVisible={!!warningText} />
        </Card>
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
