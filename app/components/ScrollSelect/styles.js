import { StyleSheet } from 'react-native';
import { width } from 'constants/layout';
import type from 'constants/type';

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignItems: 'center',
  },
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
    marginLeft: width / 4.25,
  },
  lastPage: {
    marginRight: width / 4.25,
  },
  label: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 24,
  },
  labelText: {
    ...type.label,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;