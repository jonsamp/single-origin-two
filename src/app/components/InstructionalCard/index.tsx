import React from 'react'
import Image from '../../components/Image'
import withTheme, { Theme } from '../../providers/theme'
import Card from '../Card'
import Instructions from '../Instructions'

interface InstructionalCardProps {
  step: {
    title?: string
    image?: number
    description?: string
  }
  theme: Theme
}

function InstructionalCard({ step, theme }: InstructionalCardProps) {
  return (
    <Card key={step.title}>
      {step.image ? <Image source={step.image} /> : null}
      {step.title ? (
        <Instructions
          text={step.title}
          textStyle={{ fontWeight: 'bold', padding: 0 }}
          style={{
            marginBottom: 0,
            borderBottomWidth: 2,
            borderBottomColor: theme.primary,
            margin: 20,
            padding: 0,
            paddingBottom: 16,
          }}
        />
      ) : null}
      {step.description ? <Instructions text={step.description} /> : null}
    </Card>
  )
}

export default withTheme(InstructionalCard)
