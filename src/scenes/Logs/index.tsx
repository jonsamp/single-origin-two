import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

import ScreenPlaceholder from '../../components/ScreenPlaceholder';
import { recipes } from '../../constants/recipes';
import { selectLogs } from '../../state/logs/selectors';
import { logDeleted } from '../../state/logs/actions';
import { Logs as LogsType, Log } from '../../types/index';
import LogItem from './LogItem';
import { useTailwind, useTheme } from '../../common/theme';

type Props = {
  logs: LogsType;
  navigation: any;
  logDeleted: (props: { timestamp: number }) => void;
};

function Logs(props: Props) {
  const { navigation } = props;
  const { theme, dark } = useTheme();
  const tw = useTailwind();
  const dispatch = useDispatch();
  const logs = useSelector(selectLogs);

  function byTimestamp(a: Log, b: Log) {
    return b.timestamp - a.timestamp;
  }

  function onDelete(timestamp: number) {
    dispatch(logDeleted({ timestamp }));
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
          onDelete={onDelete}
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
            tw('flex-1 h-0'),
            {
              backgroundColor: theme.border.default,
            },
          ]}
        />
      )}
      ListEmptyComponent={
        <ScreenPlaceholder text='Notes of each brew will appear here once you complete a brew.' />
      }
    />
  );
}

export default Logs;
