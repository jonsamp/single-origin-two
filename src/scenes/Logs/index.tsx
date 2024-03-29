import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useTailwind } from 'tailwind-rn';

import ScreenPlaceholder from '../../components/ScreenPlaceholder';
import { Separator } from '../../components/Separator';
import { recipes } from '../../constants/recipes';
import { logDeleted } from '../../state/logs/actions';
import { selectLogs } from '../../state/logs/selectors';
import { Logs as LogsType, Log } from '../../state/logs/types';
import LogItem from './LogItem';

type Props = {
  logs: LogsType;
  navigation: any;
  logDeleted: (props: { timestamp: number }) => void;
};

function Logs(props: Props) {
  const { navigation } = props;
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
      contentContainerStyle={tw('pt-4 bg-screen dark:bg-screen-dark flex-1')}
      data={Object.values(logs)
        .filter((log) => log && recipes[log.recipeId])
        .sort(byTimestamp)}
      keyExtractor={(log) => String(log.timestamp)}
      renderItem={({ item }) => (
        <LogItem
          log={item}
          onDelete={(timestamp) => onDelete(timestamp)}
          onPress={() =>
            navigation.navigate('LogDetail', {
              timestamp: item.timestamp,
            })
          }
        />
      )}
      ItemSeparatorComponent={() => <Separator />}
      ListEmptyComponent={
        <ScreenPlaceholder text="Notes of each brew will appear here once you complete a brew." />
      }
    />
  );
}

export default Logs;
