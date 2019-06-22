import { startOfDay } from 'date-fns'
import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { connect } from 'react-redux'
import withTheme from '../../../providers/theme'
import { selectLogs, selectLogsDates } from '../../../state/logs/selectors'
import { Log } from '../../../state/logs/types'
import { Theme } from '../../../types/index'
import styles from './styles'
import themeStyles from './themeStyles'

interface LogCalendarProps {
  theme: Theme
  logs: Log[]
  logsDates: string[]
}

const mapStateToProps = state => ({
  logs: selectLogs(state),
  logsDates: selectLogsDates(state),
})

class LogCalendar extends Component<LogCalendarProps> {
  isBrewDate = date =>
    this.props.logsDates.includes(`${date.month}/${date.day}/${date.year}`)

  componentDidMount() {
    // TODO: set up a focus listener to control the status bar color
    StatusBar.setBarStyle('light-content', true)
  }

  render() {
    const { logs } = this.props

    return (
      <View key={Object.keys(logs).length}>
        <View style={styles.container}>
          <Text style={styles.labelText}>BREW LOGS</Text>
          <Calendar
            monthFormat="MMMM yyyy"
            hideArrows
            hideExtraDays
            disableMonthChange
            firstDay={0}
            theme={themeStyles()}
            dayComponent={({ state, date }) => {
              return (
                <View
                  style={[
                    styles.dayContainer,
                    state === 'today' && styles.isToday,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      this.isBrewDate(date) && styles.brewDate,
                    ]}
                  >
                    {date.day}
                  </Text>
                </View>
              )
            }}
          />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps)(withTheme(LogCalendar))
