import withTheme from '@app/providers/theme'
import { Theme } from '@app/types/index'
import moment from 'moment'
import React, { Component } from 'react'
import { Text, TextStyle, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { connect } from 'react-redux'
import styles from './styles'
import themeStyles from './themeStyles'

interface LogCalendarProps {
  theme: Theme
}

const mapStateToProps = state => ({
  // currentMonthStreakDatesCompleted: selectCurrentMonthStreakDatesCompleted(
  //   state
  // ),
  // updatedDate: selectCurriculumUpdatedDate(state),
})

const mapDispatchToProps = {}

class LogCalendar extends Component<LogCalendarProps> {
  static propTypes = {
    // currentMonthStreakDatesCompleted: PropTypes.array,
    // updatedDate: PropTypes.string,
    // theme: PropTypes.object,
  }

  static defaultProps = {
    // currentMonthStreakDatesCompleted: [],
    // updatedDate: '',
  }

  // isStreakDate = ({ date }) =>
  //   this.props.currentMonthStreakDatesCompleted.find(
  //     streakDate => streakDate === moment(date.dateString).format('MM-DD-YYYY')
  //   );

  render() {
    const { theme } = this.props
    return (
      <View style={styles.cardContainer} key="streak-calendar-">
        <View style={styles.container}>
          <Text
            style={[styles.labelText, { color: theme.foreground }] as TextStyle}
          >
            BREW LOGS
          </Text>
          <Calendar
            monthFormat="MMMM yyyy"
            hideArrows
            hideExtraDays
            disableMonthChange
            firstDay={0}
            theme={themeStyles(theme)}
            dayComponent={({ state, date }) => (
              <View
                style={[
                  styles.dayContainer,
                  state === 'today' && styles.isToday,
                ]}
              >
                <Text style={[styles.dayText, { color: theme.foreground }]}>
                  {date.day}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(LogCalendar))
