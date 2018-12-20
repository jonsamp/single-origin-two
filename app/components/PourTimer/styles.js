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
  },
  trackingText: {
    ...type.title,
    fontWeight: 'bold',
  },
  trackingLabelText: {
    ...type.label,
  },
});

export default styles;
