import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Card from '../../../components/Card'
import type from '../../../constants/type'
import withTheme from '../../../providers/theme'

interface OnboardingProps {
  theme: any
}

function Onboarding(props: OnboardingProps) {
  const { theme } = props
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Onboarding')}
      activeOpacity={0.7}
    >
      <Card containerStyle={{ marginBottom: 24 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <Text style={{ ...type.body, color: theme.foreground }}>
            Get started with Single Origin 2
          </Text>
          <Feather
            name="chevron-right"
            size={theme.iconSize}
            color={theme.foreground}
          />
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default withTheme(Onboarding)