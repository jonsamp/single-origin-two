import type from '@app/constants/type'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
  },
  toggleContainer: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 50,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
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
})

export default styles
