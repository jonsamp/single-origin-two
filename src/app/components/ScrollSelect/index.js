import React from 'react';
import { BrewConsumer } from '@app/scenes/Brew/context';
import ScrollSelect from './ScrollSelect';

function ScrollSelectContainer(props) {
  return (
    <BrewConsumer>
      {context =>
        context ? <ScrollSelect {...props} context={context} /> : null
      }
    </BrewConsumer>
  );
}

export default ScrollSelectContainer;
