import { StyleSheet } from 'react-native'
import type from '../../../../../constants/type'

export default StyleSheet.create({
  section: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  timeTextContainer: {
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeTextColonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 12,
    bottom: 3,
    left: 1,
  },
  timeText: {
    ...type.largeTitle,
    marginBottom: 12,
  },
})
