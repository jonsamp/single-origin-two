import { StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import type from '../../constants/type'

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    ...ifIphoneX(
      {
        paddingTop: 50,
        paddingBottom: 16,
      },
      {
        paddingTop: 28,
        paddingBottom: 12,
      }
    ),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: { position: 'absolute', left: 12, bottom: -2 },
  right: { position: 'absolute', right: 12, bottom: -2 },
  title: type.headline,
  scriptTitle: {
    ...type.headline,
    fontFamily: 'SignPainter',
    fontSize: 28,
    lineHeight: 28,
    top: 5,
  },
})

export default styles
