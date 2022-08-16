import React from 'react';
import { Image } from 'react-native';

import { useSettings } from '../../../../common/useSettings';
import Card from '../../../../components/Card';
import Instructions from '../../../../components/Instructions';
import { getGrindImage, getVerboseSetting } from '../../../../constants/grinders';
import { height } from '../../../../constants/layout';
import { getValueUnit } from '../../../../scenes/Brew/helpers';
import { Log } from '../../../../state/logs/types';
import { BrewRecipe } from '../../recipes/types';

type Props = {
  coffeeWeight: number;
  recentLog: Log;
  recipe: BrewRecipe;
};

function GrindCoffee(props: Props) {
  const { coffeeWeight, recentLog, recipe } = props;
  const { unitHelpers } = useSettings();
  const { coffeeWeightUnit, grindUnit } = unitHelpers;

  function getHint() {
    let recommendation;
    let grindFromLastTime = '';

    if (recentLog.grind) {
      grindFromLastTime = ` you brewed with a grind setting of ${recentLog.grind} and`;
    }

    if (recentLog.tastingNote === 'bitter') {
      recommendation = `Last time${grindFromLastTime} your coffee was bitter. Try grinding your coffee coarser this time.`;
    } else if (recentLog.tastingNote === 'sour') {
      recommendation = `Last time${grindFromLastTime} your coffee was sour. Try grinding your coffee finer this time.`;
    }

    return recommendation;
  }

  function getInstructions() {
    const grinder = grindUnit.grinder;
    const grindRange = grinder.ranges[recipe.grindRangeName];
    const coffeeWeightDescription = getValueUnit(coffeeWeightUnit, coffeeWeight);
    let grinderTitle = grinder.id === 'generic' ? 'grinder' : grinder.title;
    let grindSettingDescription = `between the ${grindRange.from} and ${grindRange.to} settings`;

    if (grindRange.from === grindRange.to) {
      grindSettingDescription = `on the ${grindRange.from} setting`;
    }

    if (grinder.id === 'generic') {
      grindSettingDescription = `to a ${getVerboseSetting(recipe.grindRangeName)} coarseness`;
    }

    return `Grind **${coffeeWeightDescription}** of coffee **${grindSettingDescription}** with your ${grinderTitle}, then add the grounds to your ${recipe.title.toLowerCase()}.`;
  }

  return (
    <Card>
      {grindUnit.grinder.id === 'generic' ? (
        <Image
          source={getGrindImage(recipe.grindRangeName)}
          style={{
            resizeMode: 'cover',
            width: '100%',
            height: height / 5,
          }}
        />
      ) : null}
      <Instructions text={getInstructions()} icon="GrindIcon" hint={getHint()} />
    </Card>
  );
}

export default GrindCoffee;
