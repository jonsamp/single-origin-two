import React from 'react';

import { useSettings } from '../../../../common/useSettings';
import Card from '../../../../components/Card';
import Instructions from '../../../../components/Instructions';

type Props = {
  volume: number;
};

function BoilWater(props: Props) {
  const { volume } = props;
  const { unitHelpers } = useSettings();
  const { waterVolumeUnit, temperatureUnit } = unitHelpers;

  return (
    <Card>
      <Instructions
        text={`Heat **${waterVolumeUnit.getPreferredValue(volume)} ${
          waterVolumeUnit.unit.title
        }** of water to **${temperatureUnit.getPreferredValue(205)}${
          temperatureUnit.unit.symbol
        }** (nearly boiling).`}
        icon="WaterIcon"
      />
    </Card>
  );
}

export default BoilWater;
