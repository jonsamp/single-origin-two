import { StyleSheet } from 'react-native'
import type from '../../../../../constants/type'

export default StyleSheet.create({
  section: {
    flex: 1,
    justifyContent: 'space-between',
  },
  labelText: {
    ...type.label,
    marginBottom: 8,
    textAlign: 'center',
  },
  trackingContainer: {
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    shadowColor: 'rgba(82,181,146,0.5)',
    shadowRadius: 12,
    shadowOffset: { height: 2, width: 0 },
    marginHorizontal: 8,
    bottom: -2,
  },
  setWidthText: {
    width: 65,
    alignItems: 'center',
  },
  trackingLabelText: {
    ...type.label,
    marginBottom: 4,
  },
  trackingText: {
    ...type.header,
    fontWeight: 'bold',
  },
})
