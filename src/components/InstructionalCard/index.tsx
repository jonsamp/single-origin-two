import React from 'react';

import { useTailwind } from '../../common/theme';
import Image from '../../components/Image';
import Card from '../Card';
import Instructions from '../Instructions';

type Props = {
  step: {
    title?: string;
    image?: number;
    description?: string;
  };
};

export default function InstructionalCard(props: Props) {
  const { step } = props;
  const tw = useTailwind();

  return (
    <Card>
      {step.image ? <Image source={step.image} /> : null}
      {step.title ? (
        <Instructions
          text={step.title}
          textStyle={tw('title p-0')}
          style={tw('pb-4 border-b-2 theme.border.default')}
        />
      ) : null}
      {step.description ? <Instructions text={step.description} /> : null}
    </Card>
  );
}
