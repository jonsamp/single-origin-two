import { Feather } from '@expo/vector-icons'
import { addMinutes, format } from 'date-fns'
import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Card from '../../components/Card'
import ResponsiveScrollView from '../../components/ResponsiveScrollView'
import { height, width } from '../../constants/layout'
import recipes from '../../constants/recipes'
import type from '../../constants/type'
import formatSeconds from '../../helpers/formatSeconds'
import withSettings from '../../providers/settings'
import withTheme, { Styleguide, Theme } from '../../providers/theme'
import withTracking, { Tracking } from '../../providers/tracking'
import { selectLog } from '../../state/logs/selectors'
import { Log as LogType } from '../../state/logs/types'
import {
  notificationsReset,
  reminderCancelled,
  reminderRequested,
} from '../../state/notifications/actions'
import { selectNotifications } from '../../state/notifications/selectors'
import { Notifications } from '../../state/notifications/types'
import { Settings } from '../../state/settings/types'
import { UnitHelpers } from '../../types/index'
import styles from './styles'

interface LogProps {
  settings: Settings
  theme: Theme
  styleguide: Styleguide
  log: LogType
  unitHelpers: UnitHelpers
  isDarkTheme: boolean
  reminderRequested: (props: { timestamp: number }) => void
  notificationsReset: () => void
  reminderCancelled: () => void
  withReminder: boolean
  notifications: Notifications
  tracking: Tracking
}

const mapStateToProps = (state, props) => {
  return {
    log: selectLog(state, props.timestamp),
    notifications: selectNotifications(state),
  }
}

const mapDispatchToProps = {
  reminderRequested,
  notificationsReset,
  reminderCancelled,
}

class Log extends Component<LogProps> {
  state = {
    reminderScheduled: false,
  }

  toggleReminder = async () => {
    if (!this.state.reminderScheduled) {
      await this.props.reminderRequested({
        timestamp: this.props.log.timestamp,
      })
      return this.setState({
        reminderScheduled: true,
      })
    } else {
      await this.props.reminderCancelled()
      return this.setState({
        reminderScheduled: false,
      })
    }
  }

  componentDidMount() {
    const { tracking, withReminder, log } = this.props
    if (withReminder) {
      this.props.notificationsReset()
    }

    tracking.track(tracking.events.LOG_VIEWED, {
      isAfterRecipe: withReminder,
      ...log,
    })
  }

  capitalizeFirstLetter = string => {
    return (
      string
        .toString()
        .charAt(0)
        .toUpperCase() + string.toString().slice(1)
    )
  }

  render() {
    const {
      theme,
      log,
      unitHelpers,
      isDarkTheme,
      withReminder,
      styleguide,
    } = this.props
    const recipe = recipes[log.recipeId]
    const logConfig = {
      totalVolume: val => ({
        value: `${unitHelpers.waterVolumeUnit.getPreferredValue(val)}${
          unitHelpers.waterVolumeUnit.unit.symbol
        }`,
        label: 'Volume brewed',
      }),
      temp: val => ({
        value: `${unitHelpers.temperatureUnit.getPreferredValue(val)}${
          unitHelpers.temperatureUnit.unit.symbol
        }`,
        label: 'Temperature',
      }),
      grind: val => ({
        value: unitHelpers.grindUnit.getPreferredValue(val),
        label: 'Grind setting',
      }),
      totalBrewTime: val => ({
        value: formatSeconds(val < 0 ? 0 : val),
        label: 'Brew time',
      }),
      ratio: val => ({
        value: `1:${val}`,
        label: 'Ratio',
      }),
      tastingNote: 'Tasting Note',
      rating: 'Rating',
      notes: 'Notes',
    }
    const isMaxWidth = width >= styleguide.maxWidth
    const logStats = Object.keys(log)
      .filter(
        logKey => logConfig[logKey] && typeof logConfig[logKey] === 'function'
      )
      .map(logKey => logConfig[logKey](log[logKey]))

    return (
      <ResponsiveScrollView
        wrapperStyle={{
          backgroundColor: isDarkTheme ? theme.background : theme.grey1,
        }}
        style={{ flex: 1 }}
      >
        <View style={{ alignItems: 'center' }}>
          {recipe.icon({
            fill: theme.foreground,
            size: 2,
          })}
          <Text
            style={{
              color: theme.foreground,
              ...type.header,
              fontWeight: '900',
              marginVertical: 16,
            }}
          >
            {recipe.title} {recipe.modifier}
          </Text>
          <View>
            <Text style={[type.body, { color: theme.foreground }]}>
              Finished at {format(log.timestamp, 'h:mmA')} on{' '}
              {format(log.timestamp, 'MM/DD/YYYY')}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 24 }}>
          {['tastingNote', 'rating']
            .filter(key => log[key])
            .map((key, index) => (
              <Card
                key={key}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                containerStyle={{
                  marginTop: 4,
                  marginBottom: index === 0 ? 12 : 0,
                  marginHorizontal: 8,
                  shadowOpacity: 0,
                  padding: 16,
                }}
              >
                <Text style={[type.headline, { color: theme.foreground }]}>
                  {logConfig[key]}
                </Text>
                <Text style={[type.body, { color: theme.foreground }]}>
                  {this.capitalizeFirstLetter(log[key])}
                </Text>
              </Card>
            ))}
        </View>
        {log.notes ? (
          <Card
            containerStyle={{
              marginTop: 16,
              marginBottom: 0,
              marginHorizontal: 8,
              shadowOpacity: 0,
              padding: 16,
            }}
          >
            <Text
              style={[
                type.headline,
                { color: theme.foreground, marginBottom: 4 },
              ]}
            >
              Notes
            </Text>
            <Text style={[type.body, { color: theme.foreground }]}>
              {log.notes.trim()}
            </Text>
          </Card>
        ) : null}

        {withReminder && this.props.notifications.status !== 'denied' ? (
          <TouchableOpacity onPress={this.toggleReminder} activeOpacity={0.75}>
            <Card
              containerStyle={{
                marginTop: 16,
                marginBottom: 0,
                marginHorizontal: 8,
                padding: 16,
                backgroundColor: this.state.reminderScheduled
                  ? theme.primary
                  : isDarkTheme
                    ? theme.grey1
                    : theme.background,
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: this.state.reminderScheduled
                  ? theme.primary
                  : isDarkTheme
                    ? theme.grey1
                    : theme.background,
              }}
            >
              <View style={{ flex: 1, marginRight: 32 }}>
                <Text
                  style={[
                    type.headline,
                    {
                      color: this.state.reminderScheduled
                        ? theme.background
                        : theme.foreground,
                      fontWeight: this.state.reminderScheduled
                        ? 'bold'
                        : 'normal',
                      marginBottom: 4,
                    },
                  ]}
                >
                  {this.state.reminderScheduled
                    ? 'Tasting reminder scheduled'
                    : 'Send a tasting reminder'}
                </Text>
                {this.state.reminderScheduled && (
                  <Text style={[type.callout, { color: theme.background }]}>
                    You'll get a reminder to taste your coffee at{' '}
                    {format(addMinutes(new Date(), 6), 'h:mmA')}.
                  </Text>
                )}
              </View>
              {this.state.reminderScheduled ? (
                <Feather
                  name="check-square"
                  size={theme.iconSize}
                  color={theme.background}
                />
              ) : (
                <Feather
                  name="plus-square"
                  size={theme.iconSize}
                  color={theme.foreground}
                  style={{ opacity: 0.5 }}
                />
              )}
            </Card>
          </TouchableOpacity>
        ) : null}
        {withReminder && this.props.notifications.status === 'denied' ? (
          <Card
            containerStyle={{
              marginTop: 16,
              marginBottom: 0,
              marginHorizontal: 8,
              padding: 16,
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text
                style={[
                  type.headline,
                  { color: theme.foreground, marginBottom: 4 },
                ]}
              >
                Send a tasting reminder
              </Text>
              <Text style={[type.callout, { color: theme.foreground }]}>
                To send reminders, turn on notification permissions in Settings.
              </Text>
            </View>
            <Feather
              name="alert-triangle"
              size={theme.iconSize}
              color={theme.foreground}
            />
          </Card>
        ) : null}
        <View style={styles.cardsContainer}>
          {logStats.map(stat => (
            <Card
              containerStyle={{
                ...styles.cardContainer,

                // half screen width, subtract margin, subtract scroll view padding
                width:
                  (isMaxWidth ? styleguide.maxWidth : width) * 0.5 - 16 - 16,
              }}
              style={styles.cardStyle}
              key={stat.label}
            >
              <Text style={[styles.cardValue, { color: theme.foreground }]}>
                {stat.value}
              </Text>
              <Text style={[styles.cardLabel, { color: theme.foreground }]}>
                {stat.label}
              </Text>
            </Card>
          ))}
        </View>
      </ResponsiveScrollView>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTracking(withTheme(withSettings(Log))))
