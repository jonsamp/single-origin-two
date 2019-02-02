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
import ViewPrepSteps from 'components/ViewPrepSteps';
import HeaderImage from 'components/HeaderImage';
import cleverPourImage from './images/clever-pour.gif';
import cleverPourDefaultImage from './images/clever-pour-default.jpg';
import headerImage from './images/header.jpg';

class Clever extends Component {
  static propTypes = {
    settings: PropTypes.object,
    setRecipeState: PropTypes.func,
    handleTick: PropTypes.func,
    totalVolume: PropTypes.number,
    tip: PropTypes.object,
    warningText: PropTypes.string,
    volumePercent: PropTypes.number,
    totalTime: PropTypes.number,
    temp: PropTypes.number,
    grind: PropTypes.number,
    unitHelpers: PropTypes.object,
  };

  static defaultProps = {
    settings: {},
    setRecipeState: () => {},
    handleTick: () => {},
    totalVolume: 340,
    tip: {
      text: null,
    },
    warningText: null,
    volumePercent: 0,
    totalTime: 220,
    temp: 200,
    grind: 30,
    unitHelpers: {},
  };

  componentDidMount() {
    const { setRecipeState } = this.props;
    setRecipeState({
      key: 'pourEvents',
      value: this.configurePourEvents(),
    });
    setRecipeState({
      key: 'totalVolume',
      value: 340,
    });
  }

  withBloom = duration => this.props.settings.bloomDuration + duration;

  configurePourEvents = () => ({
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
    [this.withBloom(240)]: [
      {
        type: 'warning',
        text:
          'If your clever is still draining, grind your beans on a coarser grind next time.',
      },
    ],
  });

  render() {
    const {
      settings,
      setRecipeState,
      handleTick,
      totalVolume,
      totalTime,
      grind,
      temp,
      volumePercent,
      tip,
      warningText,
      unitHelpers,
    } = this.props;
    const {
      brewedVolumeUnit,
      coffeeWeightUnit,
      waterVolumeUnit,
      grindUnit,
    } = unitHelpers;
    const coffeeWeight = Math.round(totalVolume / settings.ratio);

    return (
      <Fragment>
        <HeaderImage source={headerImage} />
        <Title title="Clever" />
        <ViewPrepSteps recipe="clever" />
        <Card>
          <Question
            title={`How many ${
              brewedVolumeUnit.unit.title
            } would you like your brew to yield?`}
            description={`One serving is typically ${brewedVolumeUnit.getPreferredValue(
              270
            )} ${brewedVolumeUnit.unit.title}.`}
          />
          <ScrollSelect
            unitType="brewedVolumeUnit"
            min={225}
            max={450}
            defaultValue={totalVolume}
            onChange={value =>
              setRecipeState({
                key: 'totalVolume',
                value,
              })
            }
            step={1}
          />
        </Card>
        <Card>
          <Instructions
            text={`Heat **${waterVolumeUnit.getPreferredValue(totalVolume)} ${
              waterVolumeUnit.unit.title
            }** of water to nearly boiling.`}
          />
        </Card>
        <Card>
          {/* TODO: if no grinder, show picture  */}
          <Instructions
            text={`Grind **${coffeeWeightUnit.getPreferredValue(
              coffeeWeight
            )} ${
              coffeeWeightUnit.unit.title
            }** of coffee on **${grindUnit.getGrindSetting(0.75)}** with your ${
              grindUnit.grinder.shortTitle
            }.`}
          />
        </Card>
        <RecordBrewAttributes
          setRecipeState={setRecipeState}
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
            text={`Add the ground coffee to the clever. Then follow the pour timer over the next **${formatSeconds(
              totalTime
            )}**.`}
          />
          <PourTimer
            totalWaterWeight={totalVolume}
            waterPercent={volumePercent}
            onTick={handleTick}
          />
          <Tip text={tip.text} isVisible={!!tip.text} />
          <Warning text={warningText} isVisible={!!warningText} />
        </Card>
      </Fragment>
    );
  }
}

export default withSettings(Clever);
