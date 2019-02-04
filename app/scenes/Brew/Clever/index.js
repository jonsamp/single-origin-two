import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withSettings from 'providers/settings';
import formatSeconds from 'helpers/formatSeconds';
import Card from 'components/Card';
import Instructions from 'components/Instructions';
import Image from 'components/Image';
import Warning from 'components/Warning';
import PourTimer from 'components/PourTimer';
import ScrollSelect from 'components/ScrollSelect';
import Question from 'components/Question';
import RecordBrewAttributes from 'components/RecordBrewAttributes';
import Tip from 'components/Tip';
import Title from 'components/Title';
import { handleTick, getValueUnit } from 'scenes/Brew/helpers';
import ViewPrepSteps from 'components/ViewPrepSteps';
import cleverPourImage from './images/clever-pour.gif';
import cleverPourDefaultImage from './images/clever-pour-default.jpg';

class Clever extends Component {
  static propTypes = {
    settings: PropTypes.object,
    unitHelpers: PropTypes.object,
  };

  static defaultProps = {
    settings: {},
    unitHelpers: {},
  };

  withBloom = duration => this.props.settings.bloomDuration + duration;

  state = {
    pourEvents: {
      1: [{ type: 'increaseWaterLevel', volumePercent: 0.1549 }],
      [this.withBloom(-10)]: [
        {
          type: 'tip',
          text: 'In **seconds** pour up to **grams**.',
          volumePercent: 1,
          countDownTo: this.withBloom(0),
        },
      ],
      [this.withBloom(0)]: [{ type: 'increaseWaterLevel', volumePercent: 1 }],
      [this.withBloom(30)]: [
        {
          type: 'tip',
          text:
            'Use the back of a spoon to break the crust on top of the clever.',
          countDownTo: this.withBloom(40),
        },
      ],
      [this.withBloom(140)]: [
        {
          type: 'tip',
          text: 'In **seconds**, drain the clever.',
          countDownTo: this.withBloom(150),
        },
      ],
      [this.withBloom(150)]: [
        {
          type: 'tip',
          text: 'Drain the clever.',
          countDownTo: this.withBloom(160),
        },
      ],
      [this.withBloom(210)]: [
        {
          type: 'tip',
          text: 'In **seconds** the clever should be finished draining.',
          countDownTo: this.withBloom(220),
        },
      ],
      [this.withBloom(220)]: [
        {
          type: 'finished',
        },
      ],
    },
    volumePercent: 0,
    totalVolume: 340,
    totalTime: 220,
    grind: 30,
    temp: 200,
    tip: {
      text: undefined,
    },
    warningText: undefined,
  };

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
      grind,
      temp,
      volumePercent,
      tip,
      warningText,
    } = this.state;
    const {
      brewedVolumeUnit,
      coffeeWeightUnit,
      waterVolumeUnit,
      grindUnit,
    } = unitHelpers;
    const coffeeWeight = Math.round(totalVolume / settings.ratio);

    return (
      <Fragment>
        <Title title="Clever" />
        <ViewPrepSteps recipe="clever" />
        <Card>
          <Question
            title={`How many ${
              brewedVolumeUnit.unit.title
            } would you like your brew to yield?`}
            description={`One serving is typically ${getValueUnit(
              brewedVolumeUnit,
              270
            )}.`}
          />
          <ScrollSelect
            unitType="brewedVolumeUnit"
            min={225}
            max={450}
            defaultValue={totalVolume}
            onChange={value =>
              this.setState({
                totalVolume: value,
              })
            }
            step={1}
          />
        </Card>
        <Card>
          <Instructions
            text={`Heat **${getValueUnit(
              waterVolumeUnit,
              totalVolume
            )}** of water to nearly boiling.`}
            icon="WaterIcon"
          />
        </Card>
        <Card>
          {/* {grindUnit.grinder.shortTitle === 'grinder' ? (
            <Image
              source={grindUnit.getGrindSetting(0.75).image}
              style={{ resizeMode: 'cover' }}
            />
          ) : null} */}
          <Instructions
            text={`Grind **${getValueUnit(
              coffeeWeightUnit,
              coffeeWeight
            )}** of coffee to **${
              grindUnit.getGrindSetting(0.75).title
            }** with your ${
              grindUnit.grinder.shortTitle
            }, then add the grounds to your clever.`}
            icon="GrindIcon"
          />
        </Card>
        <RecordBrewAttributes
          setRecipeState={this.setRecipeState}
          grind={grind}
          temp={temp}
        />
        <Title title="Brew" />
        <Card>
          <Image
            source={cleverPourImage}
            defaultSource={cleverPourDefaultImage}
          />
          <Instructions
            text={`Follow the pour timer. Your brew will take **${formatSeconds(
              totalTime
            )}** and you'll pour a total of  **${getValueUnit(
              waterVolumeUnit,
              totalVolume
            )}** of water.`}
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

export default withSettings(Clever);
