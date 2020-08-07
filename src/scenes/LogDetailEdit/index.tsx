import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import React, { Component } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { connect } from 'react-redux'
import ScrollSelect from '../../components/ScrollSelect'
import { width } from '../../constants/layout'
import recipes from '../../constants/recipes'
import type from '../../constants/type'
import withTheme, { Styleguide, Theme } from '../../providers/theme'
import withTracking, { Tracking } from '../../providers/tracking'
import ChecklistSetting from '../../scenes/Settings/ChecklistSetting'
import { logUpdated } from '../../state/logs/actions'
import { selectLog } from '../../state/logs/selectors'
import { Log } from '../../state/logs/types'

interface LogDetailEditProps {
  navigation: any
  theme: Theme
  styleguide: Styleguide
  timestamp: number
  isDarkTheme: boolean
  logUpdated: (props: { timestamp: number; log: any }) => void
  logDeleted: (props: { timestamp: number }) => void
  log: Log
  tracking: Tracking
  route: any
}

interface LogDetailEditState {
  rating?: number
  tastingNote?: string
  notes?: string
}

const mapStateToProps = (state, props) => ({
  log: selectLog(state, props.route.params.timestamp),
})

const mapDispatchToProps = {
  logUpdated,
}

class LogDetailEdit extends Component<LogDetailEditProps, LogDetailEditState> {
  componentDidMount() {
    const { tracking } = this.props
    tracking.track(tracking.events.RATING_VIEWED)
  }

  updateLog = (key, value) => {
    this.props.logUpdated({
      timestamp: this.props.route.params.timestamp,
      log: {
        [key]: value,
      },
    })
  }

  render() {
    const { theme, isDarkTheme, log, navigation, styleguide } = this.props
    if (!log) {
      return <View style={{ backgroundColor: theme.background, flex: 1 }} />
    }

    const isMaxWidth = width >= styleguide.maxWidth

    return (
      <View
        style={{
          backgroundColor: isDarkTheme ? theme.grey2 : theme.grey1,
          flex: 1,
        }}
      >
        <StatusBar animated style="light" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            backgroundColor: isDarkTheme ? theme.grey1 : theme.background,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Feather
              name="clipboard"
              size={theme.iconSize}
              color={theme.foreground}
              style={{ top: -1, marginRight: 4 }}
            />
            <Text
              style={[
                type.headline,
                { color: theme.foreground, fontWeight: '700' },
              ]}
            >
              Rate
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather
                name="plus"
                size={theme.iconSize + 5}
                color={theme.foreground}
                style={{ transform: [{ rotate: '45deg' }], top: -1 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 12,
          }}
        >
          <KeyboardAvoidingView behavior="position">
            <View
              style={
                isMaxWidth && {
                  alignItems: 'center',
                }
              }
            >
              <View
                style={
                  isMaxWidth && {
                    width: styleguide.maxWidth,
                  }
                }
              >
                <Text
                  style={{
                    marginBottom: 32,
                    marginTop: 16,
                    color: theme.foreground,
                  }}
                >
                  Rate your {recipes[log.recipeId].title} brewed at{' '}
                  {format(log.timestamp, 'h:mmA')} on{' '}
                  {format(log.timestamp, 'MMM D, YYYY')}.
                </Text>
                <Text style={[type.title, { color: theme.foreground }]}>
                  Tasting note
                </Text>
                <View
                  style={{
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginTop: 24,
                    marginBottom: 32,
                  }}
                >
                  <ChecklistSetting
                    items={[
                      {
                        title: 'Sour',
                        id: 'sour',
                        value: log.tastingNote === 'sour',
                      },
                      {
                        title: 'Sweet',
                        id: 'sweet',
                        value: log.tastingNote === 'sweet',
                      },
                      {
                        title: 'Bitter',
                        id: 'bitter',
                        value: log.tastingNote === 'bitter',
                      },
                    ]}
                    onChange={value => this.updateLog('tastingNote', value)}
                    style={
                      isDarkTheme && {
                        backgroundColor: theme.grey1,
                        borderBottomColor: theme.border,
                      }
                    }
                  />
                </View>
                <Text style={[type.title, { color: theme.foreground }]}>
                  Overall rating
                </Text>
                <View
                  style={{
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginTop: 24,
                    marginBottom: 32,
                  }}
                >
                  <ScrollSelect
                    min={1}
                    max={10}
                    defaultValue={log.rating || 5}
                    label="RATING"
                    onChange={value => this.updateLog('rating', value)}
                    step={1}
                    style={{
                      backgroundColor: isDarkTheme
                        ? theme.grey1
                        : theme.background,
                    }}
                  />
                </View>
                <Text style={[type.title, { color: theme.foreground }]}>
                  Notes
                </Text>
                <TextInput
                  style={{
                    height: 160,
                    borderColor: theme.border,
                    borderWidth: 1,
                    borderRadius: 8,
                    backgroundColor: isDarkTheme
                      ? theme.grey1
                      : theme.background,
                    padding: 16,
                    paddingTop: 16,
                    marginTop: 24,
                    marginBottom: 100,
                    ...type.body,
                    color: theme.foreground,
                  }}
                  multiline
                  onChangeText={value => this.updateLog('notes', value)}
                  value={log.notes}
                  keyboardAppearance={isDarkTheme ? 'dark' : ('default' as any)}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTracking(withTheme(LogDetailEdit)))
