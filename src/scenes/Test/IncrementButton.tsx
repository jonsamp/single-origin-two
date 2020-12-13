import React, { ReactNode } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../../providers/theme'

type Props = {
  onPress: () => void
  icon: ReactNode
}

export function IncrementButton(props: Props) {
  const { onPress, icon } = props
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.grey2,
        },
      ]}
    >
      {icon}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
