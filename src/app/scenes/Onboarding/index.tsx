import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Header from '../../components/Header'
import Instructions from '../../components/Instructions'
import withSettings from '../../providers/settings'
import withTheme, { Theme } from '../../providers/theme'
import ChooseYield from './images/chooseYield.gif'
import Rate from './images/rate.gif'
import SelectRecipe from './images/selectRecipe.gif'
import StartTimer from './images/startTimer.gif'

interface OnboardingProps {
  navigation: NavigationScreenProp<any>
  settingUpdated: (props: { setting: string; value: boolean }) => void
  theme: Theme
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
  return (
    <>
      <Header title="Get started" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 32,
          paddingBottom: 60,
          backgroundColor: props.theme.background,
        }}
      >
        {onboarding.map(step => (
          <Card key={step.title}>
            {step.image ? <Image source={step.image} /> : null}
            <Instructions
              text={step.title}
              textStyle={{ fontWeight: 'bold', padding: 0 }}
              style={{
                marginBottom: 0,
                borderBottomWidth: 2,
                borderBottomColor: props.theme.primary,
                margin: 20,
                padding: 0,
                paddingBottom: 16,
              }}
            />
            <Instructions text={step.description} />
          </Card>
        ))}
        <Button
          title="Got it"
          onPress={() => {
            props.settingUpdated({ setting: 'onboardingVisible', value: false })
            props.navigation.goBack()
          }}
        />
      </ScrollView>
    </>
  )
}

export default withNavigation(withSettings(withTheme(Onboarding)) as any)
