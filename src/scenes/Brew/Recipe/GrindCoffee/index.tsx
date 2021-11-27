import React from 'react';
import { Image, View } from 'react-native';

import { useSettings } from '../../../../common/useSettings';
import Card from '../../../../components/Card';
import Instructions from '../../../../components/Instructions';
import { height, isMaxWidth } from '../../../../constants/layout';
import { getValueUnit } from '../../../../scenes/Brew/helpers';
import { Log } from '../../../../state/logs/types';

type Props = {
  unitHelpers: any;
  coffeeWeight: number;
  defaultGrind: number;
  title: string;
  recentLog: Log;
};

function GrindCoffee(props: Props) {
  const { coffeeWeight, defaultGrind, title, recentLog } = props;
  const { unitHelpers } = useSettings();
  const { coffeeWeightUnit, grindUnit } = unitHelpers;
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

  return (
    <Card>
      <View style={isMaxWidth && { flexDirection: 'row-reverse' }}>
        {grindUnit.grinder.shortTitle === 'grinder' ? (
          <Image
            source={grindUnit.getGrindSetting(defaultGrind).image}
            style={{
              resizeMode: 'cover',
              width: '100%',
              height: height / 5,
            }}
          />
        ) : null}
        <Instructions
          text={`Grind **${getValueUnit(coffeeWeightUnit, coffeeWeight)}** of coffee to **${
            grindUnit.getGrindSetting(defaultGrind).title
          }** with your ${
            grindUnit.grinder.shortTitle
          }, then add the grounds to your ${title.toLowerCase()}.`}
          icon="GrindIcon"
          hint={recommendation}
        />
      </View>
    </Card>
  );
}

export default GrindCoffee;
