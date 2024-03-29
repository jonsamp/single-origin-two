import React from 'react';

import { useSettings } from '../../../../common/useSettings';
import Card from '../../../../components/Card';
import Question from '../../../../components/Question';
import Slider from '../../../../components/Slider';
import { getValueUnit } from '../../../../scenes/Brew/helpers';

type Props = {
  defaultValue: number;
  setRecipeState: (props: { key: string; value: any }) => void;
  minYield: number;
  maxYield: number;
};

function YieldQuestion(props: Props) {
  const { defaultValue, setRecipeState, minYield, maxYield } = props;
  const { unitHelpers } = useSettings();
  const { brewedVolumeUnit } = unitHelpers;
  const _min = unitHelpers['brewedVolumeUnit']
    ? Math.round(unitHelpers['brewedVolumeUnit'].getPreferredValue(minYield))
    : minYield;
  const _max = unitHelpers['brewedVolumeUnit']
    ? Math.round(unitHelpers['brewedVolumeUnit'].getPreferredValue(maxYield))
    : maxYield;
  const _defaultValue = unitHelpers['brewedVolumeUnit']
    ? Math.round(unitHelpers['brewedVolumeUnit'].getPreferredValue(defaultValue))
    : defaultValue;

  function onChange(value: number) {
    setRecipeState({
      key: 'totalVolume',
      value: unitHelpers['brewedVolumeUnit'].getStandardValue(value),
    });
  }

  return (
    <Card>
      <Question
        title={`How many ${brewedVolumeUnit.unit.title} would you like your brew to yield?`}
        description={`One serving is typically ${getValueUnit(brewedVolumeUnit, 270)}.`}
      />
      <Slider
        key={brewedVolumeUnit.unit.id}
        label={`${brewedVolumeUnit.unit.title}`}
        min={_min}
        max={_max}
        defaultValue={_defaultValue}
        onChange={onChange}
      />
    </Card>
  );
}

export default YieldQuestion;
