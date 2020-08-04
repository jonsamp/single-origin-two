import { StyleSheet } from 'react-native'
import type from '../../../../../constants/type'

export default StyleSheet.create({
  section: {
    flex: 1,
    marginRight: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeTextContainer: {
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeTextColonContainer: {
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
