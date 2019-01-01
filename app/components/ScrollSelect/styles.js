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
    paddingVertical: 40,
  },
  selection: {
    marginHorizontal: 16,
    alignItems: 'center',
    padding: 12,
  },
  selectionText: {
    ...type.largeTitle,
    fontSize: 32,
    lineHeight: 32,
    height: 32,
  },
  selectionTextLargeNumber: {
    ...type.largeTitle,
    fontSize: 32,
    lineHeight: 32,
    height: 32,
  },
  scrollPage: {
    width: width / 3,
  },
  firstPage: {
    marginLeft: width / 4.25 + 24,
  },
  lastPage: {
    marginRight: width / 4.25 + 24,
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
