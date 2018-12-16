import { StyleSheet } from 'react-native';
import { width } from 'constants/layout';
import type from 'constants/type';

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 24,
  },
  selection: {
    marginHorizontal: 16,
    alignItems: 'center',
    padding: 12,
  },
  selectionText: {
    ...type.largeTitle,
    fontSize: 56,
    lineHeight: 56,
  },
  scrollPage: {
    width: width / 3,
  },
  firstPage: {
    marginLeft: width / 4.5,
  },
  lastPage: {
    marginRight: width / 4.5,
  },
});

export default styles;
