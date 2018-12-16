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
    fontSize: 42,
  },
  scrollPage: {
    width: width / 3,
    // borderWidth: 1,
  },
  firstPage: {
    // borderWidth: 1,
    // borderColor: 'red',
    marginLeft: width / 4.5,
  },
  lastPage: {
    // borderWidth: 1,
    // borderColor: 'blue',
    marginRight: width / 4.5,
  },
});

export default styles;
