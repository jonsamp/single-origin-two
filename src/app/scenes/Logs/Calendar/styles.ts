import { StyleSheet } from 'react-native'
import themes from '../../../constants/themes'
import type from '../../../constants/type'
const theme = themes.dark

const styles = StyleSheet.create({
  container: {
    paddingTop: 72,
    paddingBottom: 40,
    paddingHorizontal: 12,
    backgroundColor: theme.background,
  },
  labelText: {
    color: theme.foreground,
    paddingLeft: 12,
    ...type.label,
    marginBottom: 12,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width: '80%',
  },
  isToday: {
    borderWidth: 3,
    borderColor: theme.primary,
    borderRadius: 8,
  },
  dayText: {
    ...type.callout,
    color: theme.foreground,
    fontWeight: '700',
  },
  brewDate: {
    fontWeight: '900',
    color: theme.primary,
  },
})

export default styles
