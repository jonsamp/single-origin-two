import type from '../../../constants/type'

// Find theme style nodes (the keys in this object) here: https://github.com/wix/react-native-calendars/tree/master/src/calendar

const themeStyles = theme => ({
  'stylesheet.calendar.header': {
    header: {
      justifyContent: 'flex-start',
      paddingLeft: 12,
      paddingTop: 4,
      marginBottom: 12,
    },
    monthText: {
      ...type.subheader,
      color: theme.foreground,
      margin: 0,
    },
    dayHeader: {
      color: theme.grey3,
      marginBottom: 8,
      width: '100%',
      textAlign: 'center',
    },
  },
  'stylesheet.calendar.main': {
    container: {
      padding: 0,
    },
    week: {
      backgroundColor: theme.background,
      marginTop: 0,
      marginBottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
})

export default themeStyles
