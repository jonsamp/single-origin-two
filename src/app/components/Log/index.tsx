import moment from 'moment'
import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import recipes from '../../constants/recipes'
import type from '../../constants/type'
import withTheme from '../../providers/theme'
import { selectLog } from '../../state/logs/selectors'

interface LogProps {
  theme: any
  log: {
    recipeId: string
    timestamp: number
  }
}

const mapStateToProps = (state, props) => {
  const { timestamp } = props
  return {
    log: selectLog(state, timestamp),
  }
}

const mapDispatchToProps = {}

class Log extends Component<LogProps> {
  render() {
    const { theme, log } = this.props
    const recipe = recipes[log.recipeId]
    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: theme.background,
          alignItems: 'center',
        }}
      >
        {recipe.icon({ fill: theme.foreground, size: 2 })}
        <Text style={{ color: theme.foreground, ...type.header }}>
          {recipe.title}
        </Text>
        <View>
          <Text style={type.body}>
            Brew completed at {moment(log.timestamp).format('h:mmA')} on{' '}
            {moment(log.timestamp).format('MM/DD/YYYY')}
          </Text>
        </View>
        <Text style={{ color: theme.foreground, fontSize: 32 }}>
          {JSON.stringify(log, null, 2)}
        </Text>
      </ScrollView>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Log))