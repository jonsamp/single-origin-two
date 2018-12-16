import { StyleSheet } from 'react-native';
import { width } from 'constants/layout';
import type from 'constants/type';

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    width: width / 3.5,
    alignItems: 'center',
    padding: 8,
  },
  labelText: {
    ...type.label,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
