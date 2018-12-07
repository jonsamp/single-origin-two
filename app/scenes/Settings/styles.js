import { StyleSheet } from 'react-native';
import type from 'constants/type';

const styles = StyleSheet.create({
  container: {
    padding: 18,
    paddingVertical: 24,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: type.title,
  subContainer: {
    flex: 1,
  },
  description: {
    ...type.text,
    marginTop: 4,
    marginRight: 16,
    opacity: 0.8,
  },
  input: {
    ...type.text,
    width: 48,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 18,
    paddingLeft: 12,
  },
});

export default styles;
