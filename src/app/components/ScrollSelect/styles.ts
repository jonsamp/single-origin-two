import { StyleSheet } from 'react-native'
import type from '../../constants/type'

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignItems: 'center',
  },
  // each number in the horiz scroll view without translation
  selection: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  // each number's actual text (with translation)
  selectionText: {
    ...type.largeTitle,
    fontSize: 32,
    lineHeight: 32,
  },
  label: {
    backgroundColor: 'white',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 24,
  },
  labelText: {
    ...type.label,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default styles
