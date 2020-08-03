import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import withTheme from '../../providers/theme'
import styles from './styles'

interface HeaderProps {
  theme: any
  title: string
  right: any
  isDarkTheme: boolean
  onBack: () => void
}

function Header(props: HeaderProps) {
  const { theme, title, right, isDarkTheme, onBack } = props
  const navigation = useNavigation()

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.container,
        {
          backgroundColor: isDarkTheme ? theme.grey2 : theme.background,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <View />
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => (onBack ? onBack() : navigation.goBack())}
            style={{ padding: 12, top: 12, right: 12 }}
          >
            <Feather name="chevron-left" size={30} color={theme.foreground} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, { color: theme.foreground }]}>{title}</Text>
        <View style={styles.right}>{right}</View>
        <View />
      </View>
    </SafeAreaView>
  )
}

export default withTheme(Header)
