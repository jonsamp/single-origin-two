import React from 'react';
import { Image } from 'react-native';

import { useSettings } from '../../../../common/useSettings';
import Card from '../../../../components/Card';
import Instructions from '../../../../components/Instructions';
import { getGrindImage, GrindRange } from '../../../../constants/grinders';
import { height } from '../../../../constants/layout';
import { getValueUnit } from '../../../../scenes/Brew/helpers';
import { Log } from '../../../../state/logs/types';

type Props = {
  coffeeWeight: number;
  defaultGrind: number;
  title: string;
  recentLog: Log;
  grindRange: GrindRange;
};

function GrindCoffee(props: Props) {
  const { coffeeWeight, defaultGrind, title, recentLog, grindRange } = props;
  const { unitHelpers } = useSettings();
  const { coffeeWeightUnit, grindUnit } = unitHelpers;
  let recommendation;
  let grindFromLastTime = '';
  const grinderSetting =
    grindUnit.getGrindRange(grindRange).title ?? grindUnit.getGrindSetting(defaultGrind).title;

  if (recentLog.grind) {
    grindFromLastTime = ` you brewed with a grind setting of ${recentLog.grind} and`;
  }

  if (recentLog.tastingNote === 'bitter') {
    recommendation = `Last time${grindFromLastTime} your coffee was bitter. Try grinding your coffee coarser this time.`;
  } else if (recentLog.tastingNote === 'sour') {
    recommendation = `Last time${grindFromLastTime} your coffee was sour. Try grinding your coffee finer this time.`;
  }

  function getHint() {} //TODO:

  return (
    <Card>
      {grindUnit.grinder.id === 'generic' ? (
        <Image
          source={getGrindImage(grindRange)}
          style={{
            resizeMode: 'cover',
            width: '100%',
            height: height / 5,
          }}
        />
      ) : null}
      <Instructions
        text={`Grind **${getValueUnit(
          coffeeWeightUnit,
          coffeeWeight
        )}** of coffee to **${grinderSetting}** with your ${
          grindUnit.grinder.title
        }, then add the grounds to your ${title.toLowerCase()}.`}
        icon="GrindIcon"
        hint={recommendation}
      />
    </Card>
  );
}

export default GrindCoffee;
