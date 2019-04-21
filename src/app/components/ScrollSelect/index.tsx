import { BrewConsumer } from '@app/scenes/Brew/context'
import React from 'react'
import ScrollSelect from './ScrollSelect'

function ScrollSelectContainer(props: any) {
  return (
    <BrewConsumer>
      {context =>
        context ? <ScrollSelect {...props} context={context} /> : null
      }
    </BrewConsumer>
  )
}

export default ScrollSelectContainer
