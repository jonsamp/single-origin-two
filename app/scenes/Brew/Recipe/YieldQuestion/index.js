import React from 'react';
import PropTypes from 'prop-types';
import withSettings from 'providers/settings';
import { getValueUnit } from 'scenes/Brew/helpers';
import Card from 'components/Card';
import Question from 'components/Question';
import ScrollSelect from 'components/ScrollSelect';

const propTypes = {
  unitHelpers: PropTypes.object,
  totalVolume: PropTypes.number,
  setRecipeState: PropTypes.func,
  minYield: PropTypes.number,
  maxYield: PropTypes.number,
};

function YieldQuestion({
  unitHelpers,
  totalVolume,
  setRecipeState,
  minYield,
  maxYield,
}) {
  const { brewedVolumeUnit } = unitHelpers;
  return (
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
        min={minYield}
        max={maxYield}
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
  );
}

YieldQuestion.propTypes = propTypes;

export default withSettings(YieldQuestion);
