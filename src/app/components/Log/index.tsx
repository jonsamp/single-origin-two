import { format } from 'date-fns'
import React, { Component, ReactNode } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Card from '../../components/Card'
import recipes from '../../constants/recipes'
import type from '../../constants/type'
import formatSeconds from '../../helpers/formatSeconds'
import withSettings from '../../providers/settings'
import withTheme from '../../providers/theme'
import { selectLog } from '../../state/logs/selectors'
import { Log as LogType } from '../../state/logs/types'
import { Settings } from '../../state/settings/types'
import { Theme, UnitHelpers } from '../../types/index'
import styles from './styles'

interface LogProps {
  settings: Settings
  theme: Theme
  log: LogType
  unitHelpers: UnitHelpers
  isDarkTheme: boolean
}

const mapStateToProps = (state, props) => {
  return {
    log: selectLog(state, props.timestamp),
  }
}

class Log extends Component<LogProps> {
  capitalizeFirstLetter = string => {
    return (
      string
        .toString()
        .charAt(0)
        .toUpperCase() + string.toString().slice(1)
    )
  }

  render() {
    const { theme, log, unitHelpers, isDarkTheme } = this.props
    if (!log) { return null }
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

    const logStats = Object.keys(log)
      .filter(
        logKey => logConfig[logKey] && typeof logConfig[logKey] === 'function'
      )
      .map(logKey => logConfig[logKey](log[logKey]))

    return (
      <View
        style={{
          backgroundColor: isDarkTheme ? theme.background : theme.grey1,
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 48,
            paddingHorizontal: 12,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            {recipe.icon({ fill: theme.primary, size: 2 })}
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
                Finished at {format(log.timestamp, 'h:MMA')} on{' '}
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
                  <Text style={[type.body, { color: theme.foreground }]}>
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
                {log.notes}
              </Text>
            </Card>
          ) : null}
          <View style={styles.cardsContainer}>
            {logStats.map(stat => (
              <Card
                containerStyle={styles.cardContainer}
                style={styles.cardContainer}
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
        </ScrollView>
      </View>
    )
  }
}

export default connect(mapStateToProps)(withTheme(withSettings(Log)))
