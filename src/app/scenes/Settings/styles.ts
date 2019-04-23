import type from '@app/constants/type'
import { StyleSheet, TextStyle } from 'react-native'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: type.headline as TextStyle,
  subContainer: {
    flex: 1,
  },
  description: type.caption as TextStyle,
  input: {
    ...type.body,
    width: 48,
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 13,
  },
})

export default styles
