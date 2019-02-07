import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import withTheme from 'providers/theme';
import moment from 'moment';
import styles from './styles';
import themeStyles from './themeStyles';

const mapStateToProps = state => ({
  // currentMonthStreakDatesCompleted: selectCurrentMonthStreakDatesCompleted(
  //   state
  // ),
  // updatedDate: selectCurriculumUpdatedDate(state),
});

const mapDispatchToProps = {};

class LogCalendar extends Component {
  static propTypes = {
    // currentMonthStreakDatesCompleted: PropTypes.array,
    // updatedDate: PropTypes.string,
    theme: PropTypes.object,
  };

  static defaultProps = {
    // currentMonthStreakDatesCompleted: [],
    // updatedDate: '',
  };

  // isStreakDate = ({ date }) =>
  //   this.props.currentMonthStreakDatesCompleted.find(
  //     streakDate => streakDate === moment(date.dateString).format('MM-DD-YYYY')
  //   );

  render() {
    const { theme } = this.props;
    return (
      <View style={styles.cardContainer} key="streak-calendar-">
        <View style={styles.container}>
          <Text style={[styles.labelText, { color: theme.foreground }]}>
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
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(LogCalendar));
