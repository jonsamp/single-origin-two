import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withSettings from 'providers/settings';
import formatSeconds from 'helpers/formatSeconds';

import Card from 'components/Card';
import Question from 'components/Question';
import ScrollSelect from 'components/ScrollSelect';
import Instructions from 'components/Instructions';
import Image from 'components/Image';
import Warning from 'components/Warning';
import PourTimer from 'components/PourTimer';
import Tip from 'components/Tip';

import footerImage from 'assets/pour-over-bloom-default.jpg';

class Clever extends Component {
  static propTypes = {
    settings: PropTypes.object,
    setRecipeState: PropTypes.func,
    totalVolume: PropTypes.number,
    totalTime: PropTypes.number,
    handleTick: PropTypes.func,
    tip: PropTypes.object,
    warningText: PropTypes.string,
    volumePercent: PropTypes.number,
  };

  componentDidMount() {
    const { settings, setRecipeState } = this.props;
    setRecipeState({ key: 'totalVolume', value: 340 });
    setRecipeState({
      key: 'totalTime',
      value: settings.bloomDuration + 190,
    });
    setRecipeState({
      key: 'pourEvents',
      value: this.configurePourEvents(),
    });
  }

  configurePourEvents = () => {
    const { settings } = this.props;
    return {
      1: [{ type: 'increaseWaterLevel', volumePercent: 0.1549 }],
      [settings.bloomDuration - 10]: [
        {
          type: 'tip',
          text: 'In **seconds** seconds pour up to **grams** grams.',
          volumePercent: 1,
          countDownTo: settings.bloomDuration,
        },
      ],
      [settings.bloomDuration]: [
        { type: 'increaseWaterLevel', volumePercent: 1 },
      ],
      [settings.bloomDuration + 30]: [
        {
          type: 'tip',
          text:
            'Use the back of a spoon to break the crust on top of the clever.',
          countDownTo: settings.bloomDuration + 40,
        },
      ],
      [settings.bloomDuration + 140]: [
        {
          type: 'tip',
          text: 'In **seconds** seconds, drain the clever.',
          countDownTo: settings.bloomDuration + 150,
        },
      ],
      [settings.bloomDuration + 150]: [
        {
          type: 'finished',
        },
      ],
      [settings.bloomDuration + 160]: [
        {
          type: 'warning',
          text:
            'Consider stopping the clever from dripping. Your coffee may become bitter.',
        },
      ],
    };
  };

  render() {
    const {
      settings,
      totalVolume,
      setRecipeState,
      totalTime,
      volumePercent,
      handleTick,
      tip,
      warningText,
    } = this.props;

    if (!totalVolume) {
      return null;
    }

    const coffeeWeight = Math.round(totalVolume / settings.ratio);

    return (
      <Fragment>
        <Card>
          <Instructions text="placeholder: prep steps ..." />
        </Card>
        <Card>
          <Question
            title="How many grams would you like the brew to yield? "
            description="One cup is typically 270 grams."
          />
          <ScrollSelect
            min={225}
            max={450}
            defaultValue={totalVolume}
            label="grams"
            onChange={value => setRecipeState({ key: 'totalVolume', value })}
            step={5}
          />
        </Card>
        <Card>
          {/* TODO: if no grinder, show picture  */}
          <Instructions
            text={`Grind **${coffeeWeight}** grams of coffee on **#30** with your Baratza Encore.`}
          />
        </Card>
        <Card>
          <Instructions text="placeholder: record your levels ..." />
        </Card>
        <Card>
          <Image source={footerImage} />
          <Instructions
            text={`Add the ground coffee to the clever, then follow the pour timer over the next **${formatSeconds(
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
