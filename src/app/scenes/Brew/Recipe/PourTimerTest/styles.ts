import { StyleSheet } from 'react-native'
import type from '../../../../constants/type'

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingVertical: 40,
    flexDirection: 'row',
  },
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
  labelText: {
    ...type.label,
    marginBottom: 8,
  },
  trackingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    shadowColor: 'rgba(82,181,146,0.5)',
    shadowRadius: 12,
    shadowOffset: { height: 2, width: 0 },
  },
  trackingText: {
    ...type.header,
    fontWeight: 'bold',
  },
  setWidthText: {
    width: 65,
    alignItems: 'center',
  },
  trackingLabelText: {
    ...type.label,
    marginBottom: 4,
  },
})

export default styles
