import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/Button'
import InstructionalCard from '../../components/InstructionalCard'
import ResponsiveScrollView from '../../components/ResponsiveScrollView'
import withSettings from '../../providers/settings'
import ChooseYield from './images/chooseYield.gif'
import Rate from './images/rate.gif'
import SelectRecipe from './images/selectRecipe.gif'
import StartTimer from './images/startTimer.gif'

interface OnboardingProps {
  settingUpdated: (props: { setting: string; value: boolean }) => void
}

const onboarding = [
  {
    title: 'Select a brew method',
    description:
      'Each brew method comes with the appropriate timers and calculations to enable you to brew perfectly every time.',
    image: SelectRecipe,
  },
  {
    title: "Choose how much you'd like to brew",
    description:
      "Select how much coffee you'd like to make, then follow the instructions.",
    image: ChooseYield,
  },
  {
    title: 'Record your grind and temperature',
    description:
      'When you record your grind setting and temperature, Single Origin 2 can give you better suggestions next time you brew.',
    image: null,
  },
  {
    title: 'Pour with the timer',
    description:
      'Tap start, then pour along with the timer. You can pour with or without a scale as long as you pour with a thin stream in tiny circles.',
    image: StartTimer,
  },
  {
    title: 'Rate your brew',
    description:
      'Get a reminder to taste and rate your coffee. Then see smart suggestions the next time you brew with the same method.',
    image: Rate,
  },
  {
    title: 'Adjust settings',
    description:
      'Inside the settings tab, you may pick units, grinders, and various other settings to dial in your setup and preferences.',
    image: null,
  },
]

function Onboarding(props: OnboardingProps) {
  const navigation = useNavigation()

  return (
    <>
      <ResponsiveScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        {onboarding.map((step) => (
          <InstructionalCard key={step.title} step={step} />
        ))}
        <Button
          title="Got it"
          onPress={() => {
            props.settingUpdated({
              setting: 'onboardingVisible',
              value: false,
            })
            navigation.goBack()
          }}
        />
      </ResponsiveScrollView>
    </>
  )
}

export default withSettings(Onboarding)
