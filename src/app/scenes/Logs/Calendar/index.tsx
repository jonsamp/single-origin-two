import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { StatusBar } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { connect } from 'react-redux'
import withTheme from '../../../providers/theme'
import { Theme } from '../../../types/index'
import styles from './styles'
import themeStyles from './themeStyles'

interface LogCalendarProps {
  theme: Theme
}

const mapStateToProps = state => ({})

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

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true)
  }

  render() {
    const { theme } = this.props

    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.labelText}>BREW LOGS</Text>
          <Calendar
            monthFormat="MMMM yyyy"
            hideArrows
            hideExtraDays
            disableMonthChange
            firstDay={0}
            theme={themeStyles()}
            dayComponent={({ state, date }) => (
              <View
                style={[
                  styles.dayContainer,
                  state === 'today' && styles.isToday,
                ]}
              >
                <Text style={styles.dayText}>{date.day}</Text>
              </View>
            )}
          />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps)(withTheme(LogCalendar))
