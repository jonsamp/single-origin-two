import { StyleSheet } from 'react-native';
import type from 'constants/type';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingVertical: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  section: {
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderRadius: 10,
  },
  trackingText: {
    ...type.title,
  },
});

export default styles;
