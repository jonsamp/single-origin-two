import { StyleSheet } from 'react-native'
import type from '../../constants/type'

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.1,
    zIndex: 1,
    paddingBottom: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: { position: 'absolute', left: 6, bottom: -6 },
  right: { position: 'absolute', right: 6, bottom: -2 },
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
