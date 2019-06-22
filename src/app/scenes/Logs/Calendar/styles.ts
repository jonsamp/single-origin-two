import { StyleSheet } from 'react-native'
import { width } from '../../../constants/layout'
import themes from '../../../constants/themes'
import type from '../../../constants/type'
const theme = themes.dark

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: theme.background,
  },
  labelText: {
    color: theme.foreground,
    paddingLeft: 12,
    ...type.label,
    marginBottom: 8,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    width: '80%',
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 8,
  },
  isToday: {
    borderWidth: 2,
    borderColor: theme.primary,
    borderRadius: 8,
  },
  dayText: {
    ...type.callout,
    color: theme.foreground,
    fontWeight: '700',
    fontSize: width * 0.038,
  },
  brewDate: {
    fontWeight: '900',
    color: theme.primary,
    fontSize: width * 0.038,
  },
})

export default styles
