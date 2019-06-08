import React from 'react'
import { BrewConsumer } from '../../scenes/Brew/context'
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
