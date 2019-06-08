import { StyleSheet, TextStyle } from 'react-native'
import type from '../../../constants/type'

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  container: {
    // borderRadius: 20,
    // borderWidth: 1,
    // backgroundColor: colors.swatches.white,
    // borderColor: colors.swatches.grey[200],
    // overflow: 'hidden',
    paddingVertical: 24,
  },
  labelText: {
    // ...type.subheader,
    // color: colors.swatches.grey[600],
    paddingLeft: 12,
    ...type.label,
    marginBottom: 12,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  isToday: {
    // borderColor: colors.swatches.yellow[600],
    // borderTopColor: colors.swatches.yellow[600],
    // borderBottomColor: colors.swatches.yellow[600],
    // padding: 8,
    // top: 1,
  },
  isStreakDay: {
    // backgroundColor: colors.swatches.yellow[500],
  },
  dayText: {
    ...(type.callout as TextStyle),
  },
})

export default styles
