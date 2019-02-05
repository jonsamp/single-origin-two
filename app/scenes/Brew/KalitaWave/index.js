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
import KalitaWavePour from './images/kalita-wave-pour.gif';
import KalitaWavePourDefault from './images/kalita-wave-pour-default.jpg';

class KalitaWave extends Component {
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
      1: [{ type: 'increaseWaterLevel', volumePercent: 0.1538 }],
      [this.withBloom(-10)]: [
        {
          type: 'tip',
          text: 'In **seconds** pour up to **grams**.',
          volumePercent: 0.5385,
          countDownTo: this.withBloom(0),
        },
      ],
      [this.withBloom(0)]: [
        { type: 'increaseWaterLevel', volumePercent: 0.5385 },
      ],
      [this.withBloom(30)]: [
        {
          type: 'tip',
          text: 'In **seconds** pour up to **grams**.',
          volumePercent: 0.6923,
          countDownTo: this.withBloom(40),
        },
      ],
      [this.withBloom(40)]: [
        { type: 'increaseWaterLevel', volumePercent: 0.6923 },
      ],
      [this.withBloom(55)]: [
        {
          type: 'tip',
          text: 'In **seconds** pour up to **grams**.',
          volumePercent: 0.8462,
          countDownTo: this.withBloom(65),
        },
      ],
      [this.withBloom(65)]: [
        { type: 'increaseWaterLevel', volumePercent: 0.8462 },
      ],
      [this.withBloom(80)]: [
        {
          type: 'tip',
          text: 'In **seconds** pour up to **grams**.',
          volumePercent: 1,
          countDownTo: this.withBloom(90),
        },
      ],
      [this.withBloom(90)]: [{ type: 'increaseWaterLevel', volumePercent: 1 }],
      [this.withBloom(135)]: [
        {
          type: 'tip',
          text: 'In **seconds** the kalita wave should be finished draining.',
          countDownTo: this.withBloom(145),
        },
      ],
      [this.withBloom(145)]: [
        {
          type: 'finished',
        },
      ],
    },
    volumePercent: 0,
    totalVolume: 325,
    totalTime: 175,
    defaultGrind: 0.5,
    grind: null,
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
      temp,
      defaultGrind,
      grind,
      volumePercent,
      tip,
      warningText,
    } = this.state;
    const {
      brewedVolumeUnit,
      coffeeWeightUnit,
      waterVolumeUnit,
      grindUnit,
      temperatureUnit,
    } = unitHelpers;
    const coffeeWeight = Math.round(totalVolume / settings.ratio);

    return (
      <Fragment>
        <Title title="Kalita Wave" />
        <ViewPrepSteps recipe="KalitaWave" />
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
            min={150}
            max={525}
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
            )}** of water to **${temperatureUnit.getPreferredValue(200)}${
              temperatureUnit.unit.symbol
            }** (nearly boiling).`}
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
              grindUnit.getGrindSetting(defaultGrind).title
            }** with your ${
              grindUnit.grinder.shortTitle
            }, then add the grounds to your kalita wave.`}
            icon="GrindIcon"
          />
        </Card>
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
          <Image
            source={KalitaWavePour}
            defaultSource={KalitaWavePourDefault}
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

export default withSettings(KalitaWave);
