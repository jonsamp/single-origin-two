import { StyleSheet } from 'react-native'
import type from '../../constants/type'

const styles = StyleSheet.create({
  placeholderContainer: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 24,
  },
  placeholderText: {
    ...type.body,
    textAlign: 'center',
  },
})

export default styles
