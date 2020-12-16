import React from 'react'
import { FlatList, View } from 'react-native'
import { connect } from 'react-redux'
import ScreenPlaceholder from '../../components/ScreenPlaceholder'
import recipes from '../../constants/recipes'
import { useTheme } from '../../providers/theme'
import { selectLogs } from '../../state/logs/selectors'
import { Logs as LogsType, Log } from '../../types/index'
import LogItem from './LogItem'
import styles from './styles'

interface Props {
  logs: LogsType
  navigation: any
}

const mapStateToProps = (state) => ({
  logs: selectLogs(state),
})

function Logs(props: Props) {
  const { logs, navigation } = props
  const { colors } = useTheme()

  function byTimestamp(a: Log, b: Log) {
    return b.timestamp - a.timestamp
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 16 }}
      data={Object.values(logs)
        .filter((log) => log && recipes[log.recipeId])
        .sort(byTimestamp)}
      keyExtractor={(log) => String(log.timestamp)}
      renderItem={({ item }) => (
        <LogItem
          log={item}
          onPress={() =>
            navigation.navigate('LogDetail', {
              timestamp: item.timestamp,
            })
          }
        />
      )}
      ItemSeparatorComponent={() => (
        <View
          style={[
            styles.separator,
            {
              backgroundColor: colors.border,
            },
          ]}
        />
      )}
      ListEmptyComponent={
        <ScreenPlaceholder text="Notes of each brew will appear here once you complete a brew." />
      }
    />
  )
}

export default connect(mapStateToProps)(Logs)
