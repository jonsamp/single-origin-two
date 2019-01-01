import { StyleSheet } from 'react-native';
import type from 'constants/type';

const CIRCLE_SIZE = 20;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    ...type.scriptTitle,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    marginRight: 8,
    bottom: 3,
  },
});

export default styles;
