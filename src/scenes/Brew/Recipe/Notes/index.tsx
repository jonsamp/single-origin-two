import React from 'react';
import Card from '../../../../components/Card';
import Instructions from '../../../../components/Instructions';

type Props = {
  text: string;
};

function Notes(props: Props) {
  const { text } = props;

  return (
    <Card>
      <Instructions text={'Your notes from last time:'} hint={text.trim()} />
    </Card>
  );
}

export default Notes;
