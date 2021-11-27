import React from 'react';

import { useSettings } from '../../../../common/useSettings';
import Card from '../../../../components/Card';
import Instructions from '../../../../components/Instructions';

type Props = {
  unitHelpers: any;
  volume: number;
};

function AddIce(props: Props) {
  const { volume } = props;
  const { unitHelpers } = useSettings();
  const { waterVolumeUnit } = unitHelpers;

  return (
    <Card>
      <Instructions
        text={`Add **${waterVolumeUnit.getPreferredValue(volume)} ${
          waterVolumeUnit.unit.title
        }** of ice to your carafe or mug.`}
        icon="IceIcon"
      />
    </Card>
  );
}

export default AddIce;
