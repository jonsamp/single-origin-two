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
  Platform,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { isMaxWidth } from '../../constants/layout'
import recipes from '../../constants/recipes'
import type from '../../constants/type'
import withTheme, { Styleguide, Theme } from '../../providers/theme'
import withTracking, { Tracking } from '../../providers/tracking'
import ChecklistSetting from '../../scenes/Settings/ChecklistSetting'
import { logUpdated, logDeleted } from '../../state/logs/actions'
import { selectLog } from '../../state/logs/selectors'
import { Log } from '../../state/logs/types'
import Button from '../../components/Button'
import Slider from '../../components/Slider'

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
  logDeleted,
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
    const {
      theme,
      isDarkTheme,
      log,
      navigation,
      styleguide,
      logDeleted,
    } = this.props
    if (!log) {
      return <View style={{ backgroundColor: theme.background, flex: 1 }} />
    }

    return (
      <View
        style={{
          backgroundColor: isDarkTheme ? theme.grey2 : theme.grey1,
          flex: 1,
        }}
      >
        {!isMaxWidth &&
          Platform.select({ ios: <StatusBar animated style="light" /> })}
        {Platform.select({
          ios: (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
                backgroundColor: theme.navigationBackground,
                borderBottomWidth: 1,
                borderBottomColor: theme.border,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Feather
                  name="edit-3"
                  size={theme.iconSize}
                  color={theme.foreground}
                  style={{ top: 1, marginRight: 8 }}
                />
                <Text
                  style={[
                    type.headline,
                    { color: theme.foreground, fontWeight: '600' },
                  ]}
                >
                  Edit Note
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ paddingRight: 4 }}
                >
                  <Text style={[type.headline, { color: theme.text }]}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ),
        })}
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 12,
          }}
        >
          <KeyboardAvoidingView behavior="padding">
            <SafeAreaView
              edges={['bottom']}
              style={[
                isMaxWidth && {
                  alignItems: 'center',
                },
                {
                  marginBottom: 16,
                },
              ]}
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
                    marginBottom: 24,
                    marginTop: 16,
                    color: theme.foreground,
                  }}
                >
                  Rate your {recipes[log.recipeId].title} brewed at{' '}
                  {format(log.timestamp, 'h:mma')} on{' '}
                  {format(log.timestamp, 'MMM d, yyyy')}.
                </Text>
                <Text style={[type.title, { color: theme.foreground }]}>
                  Tasting note
                </Text>
                <View
                  style={{
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginTop: 16,
                    marginBottom: 24,
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
                    onChange={(value) => this.updateLog('tastingNote', value)}
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
                    marginTop: 16,
                    marginBottom: 24,
                  }}
                >
                  <Slider
                    min={1}
                    max={10}
                    defaultValue={log.rating || 5}
                    label="rating"
                    onChange={(value) => this.updateLog('rating', value)}
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
                    marginTop: 16,
                    textAlignVertical: 'top',
                    ...type.body,
                    color: theme.text,
                  }}
                  multiline
                  onChangeText={(value) => this.updateLog('notes', value)}
                  value={log.notes}
                  keyboardAppearance={isDarkTheme ? 'dark' : ('default' as any)}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                />
                <Text
                  style={[
                    type.title,
                    {
                      color: theme.foreground,
                      marginTop: 32,
                      marginBottom: 16,
                    },
                  ]}
                >
                  Delete note
                </Text>
                <Button
                  onPress={() => {
                    logDeleted({ timestamp: log.timestamp })
                    navigation.popToTop()
                  }}
                  title="Delete Note"
                  type="secondary"
                />
              </View>
            </SafeAreaView>
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
