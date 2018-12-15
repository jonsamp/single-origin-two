import { StyleSheet } from 'react-native';
import { width } from 'constants/layout';
import type from 'constants/type';

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 24,
  },
  selection: {
    marginHorizontal: 16,
    width: width / 3.5,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
  },
});

export default styles;
