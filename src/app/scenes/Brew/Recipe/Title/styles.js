import { StyleSheet } from 'react-native'
import type from '@app/constants/type'

const CIRCLE_SIZE = 20

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    ...type.scriptTitle,
  },
  circle: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    marginRight: 8,
    bottom: 4,
  },
})

export default styles
