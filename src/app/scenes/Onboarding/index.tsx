import React from 'react'
import { ScrollView, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import Button from '../../components/Button'
import Header from '../../components/Header'
import InstructionalCard from '../../components/InstructionalCard'
import { width } from '../../constants/layout'
import withSettings from '../../providers/settings'
import withTheme, { Styleguide, Theme } from '../../providers/theme'
import ChooseYield from './images/chooseYield.gif'
import Rate from './images/rate.gif'
import SelectRecipe from './images/selectRecipe.gif'
import StartTimer from './images/startTimer.gif'

interface OnboardingProps {
  navigation: NavigationScreenProp<any>
  settingUpdated: (props: { setting: string; value: boolean }) => void
  theme: Theme
  styleguide: Styleguide
}

const onboarding = [
  {
    title: 'Select a brew method',
    description:
      'Each brew method comes with the appropriate timers and calculations to enable you to brew perfectly every time.',
    image: SelectRecipe,
  },
  {
    title: 'Choose how much you\'d like to brew',
    description:
      'Select how much coffee you\'d like to make, then follow the instructions.',
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
  const isMaxWidth = width >= props.styleguide.maxWidth
  return (
    <>
      <Header title="Get started" />
      <View
        style={
          isMaxWidth && {
            alignItems: 'center',
            backgroundColor: props.theme.background,
          }
        }
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 32,
            paddingBottom: 60,
            backgroundColor: props.theme.background,
            ...(isMaxWidth && { width: props.styleguide.maxWidth }),
          }}
        >
          {onboarding.map(step => (
            <InstructionalCard key={step.title} step={step} />
          ))}
          <Button
            title="Got it"
            onPress={() => {
              props.settingUpdated({
                setting: 'onboardingVisible',
                value: false,
              })
              props.navigation.goBack()
            }}
          />
        </ScrollView>
      </View>
    </>
  )
}

export default withNavigation(withSettings(withTheme(Onboarding)) as any)
