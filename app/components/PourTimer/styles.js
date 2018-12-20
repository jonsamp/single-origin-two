import { StyleSheet } from 'react-native';
import type from 'constants/type';

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
    borderRadius: 10,
    shadowColor: 'rgba(82,181,146,0.5)',
    shadowRadius: 12,
    shadowOffset: { height: 2 },
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
  },
});

export default styles;
