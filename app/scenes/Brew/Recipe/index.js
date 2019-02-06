import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withSettings from 'providers/settings';
import formatSeconds from 'helpers/formatSeconds';
import Card from 'components/Card';
import Image from 'components/Image';
import Instructions from 'components/Instructions';
import { handleTick } from 'scenes/Brew/helpers';
import recipes from 'scenes/Brew/recipes';
import Warning from './Warning';
import Tip from './Tip';
import Title from './Title';
import Preparation from './Preparation';
import YieldQuestion from './YieldQuestion';
import BoilWater from './BoilWater';
import GrindCoffee from './GrindCoffee';
import RecordBrewAttributes from './RecordBrewAttributes';
import PourTimer from './PourTimer';

class Recipe extends Component {
  static propTypes = {
    settings: PropTypes.object,
    unitHelpers: PropTypes.object,
    id: PropTypes.string,
  };

  static defaultProps = {
    settings: {},
    unitHelpers: {},
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
  };

  componentWillMount() {
    const recipe = recipes[this.props.id]({ settings: this.props.settings });
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
  };

  render() {
    const { settings, unitHelpers } = this.props;
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
      title,
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
        <Title title={title} />
        <Preparation recipe={this.props.id} />
        <YieldQuestion
          totalVolume={totalVolume}
          setRecipeState={this.setRecipeState}
          minYield={minYield}
          maxYield={maxYield}
        />
        <BoilWater totalVolume={totalVolume} />
        <GrindCoffee
          coffeeWeight={coffeeWeight}
          defaultGrind={defaultGrind}
          title={title}
        />
        <RecordBrewAttributes
          setRecipeState={this.setRecipeState}
          defaultGrind={defaultGrind}
          grind={grind}
          temp={temp}
          grindUnit={grindUnit}
          temperatureUnit={temperatureUnit}
        />
        <Title title="Brew" />
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
      </Fragment>
    );
  }
}

export default withSettings(Recipe);
