import { StyleSheet } from 'react-native';
import type from 'constants/type';

const styles = StyleSheet.create({
  container: {},
  toggleContainer: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 50,
  },
  labelContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    position: 'absolute',
    flex: 1,
  },
  labelButtonContainer: {
    flex: 1,
  },
  labelButton: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    ...type.label,
    ...type.allCaps,
    fontWeight: 'bold',
  },
});

export default styles;
