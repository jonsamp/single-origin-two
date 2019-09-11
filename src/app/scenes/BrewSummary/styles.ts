import { StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { width } from '../../constants/layout'

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width,
  },
  button: {
    height: 60,
    margin: 12,
    ...ifIphoneX(
      {
        marginBottom: 32,
      },
      {
        marginBottom: 12,
      }
    ),
  },
})

export default styles
