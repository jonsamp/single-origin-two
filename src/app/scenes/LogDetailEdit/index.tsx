import { format } from 'date-fns'
import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { NavigationScreenProp, withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import ScrollSelect from '../../components/ScrollSelect'
import recipes from '../../constants/recipes'
import type from '../../constants/type'
import withTheme from '../../providers/theme'
import ChecklistSetting from '../../scenes/Settings/ChecklistSetting'
import { logDeleted, logUpdated } from '../../state/logs/actions'
import { selectLog } from '../../state/logs/selectors'
import { Log } from '../../state/logs/types'
import { State } from '../../state/types'
import { Theme } from '../../types'

interface LogDetailEditProps {
  navigation: NavigationScreenProp<State>
  theme: Theme
  timestamp: number
  isDarkTheme: boolean
  logUpdated: (props: { timestamp: number; log: any }) => void
  logDeleted: (props: { timestamp: number }) => void
  log: Log
}

interface LogDetailEditState {
  rating?: number
  tastingNote?: string
  notes: string
}

const mapStateToProps = (state, props) => ({
  log: selectLog(state, props.navigation.state.params.timestamp),
})

const mapDispatchToProps = {
  logUpdated,
  logDeleted,
}

class LogDetailEdit extends Component<LogDetailEditProps, LogDetailEditState> {
  state = {} as LogDetailEditState

  updateTastingNote = value => this.setState({ tastingNote: value })

  onDelete = () => {
    this.props.logDeleted({
      timestamp: this.props.navigation.state.params.timestamp,
    })

    this.props.navigation.goBack()
  }

  onSave = () => {
    this.props.logUpdated({
      timestamp: this.props.navigation.state.params.timestamp,
      log: this.state,
    })

    this.props.navigation.goBack()
  }

  render() {
    const { theme, isDarkTheme, log } = this.props

    return (
      <View
        style={{
          backgroundColor: isDarkTheme ? theme.grey2 : theme.grey1,
          flex: 1,
        }}
      >
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={100}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 32,
              paddingHorizontal: 12,
            }}
          >
            <Text style={[type.header, { color: theme.foreground }]}>
              Edit log
            </Text>
            <Text
              style={{
                marginBottom: 24,
                marginTop: 8,
                color: theme.foreground,
              }}
            >
              Editing your {recipes[log.recipeId].title} logged at{' '}
              {format(log.timestamp, 'h:mmA')} on{' '}
              {format(log.timestamp, 'MM/DD/YYYY')}.
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
                    value: this.state.tastingNote
                      ? this.state.tastingNote === 'sour'
                      : log.tastingNote === 'sour',
                  },
                  {
                    title: 'Sweet',
                    id: 'sweet',
                    value: this.state.tastingNote
                      ? this.state.tastingNote === 'sweet'
                      : log.tastingNote === 'sweet',
                  },
                  {
                    title: 'Bitter',
                    id: 'bitter',
                    value: this.state.tastingNote
                      ? this.state.tastingNote === 'bitter'
                      : log.tastingNote === 'bitter',
                  },
                ]}
                onChange={this.updateTastingNote}
                style={
                  isDarkTheme && {
                    backgroundColor: theme.grey1,
                    borderBottomColor: theme.grey2,
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
                onChange={value => this.setState({ rating: value })}
                step={1}
                style={
                  isDarkTheme && {
                    backgroundColor: theme.grey1,
                  }
                }
              />
            </View>
            <Text style={[type.title, { color: theme.foreground }]}>Notes</Text>
            <TextInput
              style={{
                height: 160,
                borderColor: theme.grey1,
                borderWidth: 1,
                borderRadius: 8,
                backgroundColor: isDarkTheme ? theme.grey1 : theme.background,
                padding: 16,
                paddingTop: 16,
                marginTop: 24,
                marginBottom: 100,
                ...type.body,
                color: theme.foreground,
              }}
              multiline
              onChangeText={text => this.setState({ notes: text })}
              value={this.state.notes || log.notes || ''}
              keyboardAppearance={isDarkTheme ? 'dark' : ('default' as any)}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <Button
          onPress={this.onSave}
          title="Save"
          customStyle={{ paddingBottom: 32, borderRadius: 0 }}
        />
      </View>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(withTheme(LogDetailEdit) as any))
