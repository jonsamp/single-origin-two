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

class Log extends Component<LogProps> {
  render() {
    const { theme, log } = this.props
    const recipe = recipes[log.recipeId]
    return (
      <View
        style={{
          backgroundColor: theme.background,
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingVertical: 32,
          }}
        >
          {recipe.icon({ fill: theme.foreground, size: 2 })}
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
              Finished at {moment(log.timestamp).format('h:mmA')} on{' '}
              {moment(log.timestamp).format('MM/DD/YYYY')}
            </Text>
          </View>
          <Text style={{ color: theme.foreground, fontSize: 32 }}>
            {JSON.stringify(log, null, 2)}
          </Text>
        </ScrollView>
      </View>
    )
  }
}

export default connect(mapStateToProps)(withTheme(Log))
