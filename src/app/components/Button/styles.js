import { StyleSheet } from 'react-native';
import type from '@app/constants/type';

const defaultButton = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 14,
  paddingHorizontal: 28,
  overflow: 'hidden',
  borderRadius: 4,
};

const styles = StyleSheet.create({
  text: {
    ...type.callout,
    fontWeight: 'bold',
    letterSpacing: 0.65,
  },
  buttonContainer: {
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowRadius: 4,
    shadowOffset: { height: 2 },
    shadowOpacity: 1,
  },
  button: defaultButton,
  disabled: {
    opacity: 0.5,
  },
  textOutline: {
    fontWeight: 'bold',
    letterSpacing: 0.65,
  },
  buttonOutline: {
    ...defaultButton,
    paddingVertical: 12,
    paddingHorizontal: 26,
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
});

export default styles;
