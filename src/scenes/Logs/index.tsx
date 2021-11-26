import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";

import ScreenPlaceholder from "../../components/ScreenPlaceholder";
import { recipes } from "../../constants/recipes";
import { useTheme } from "../../providers/theme";
import { selectLogs } from "../../state/logs/selectors";
import { logDeleted } from "../../state/logs/actions";
import { Logs as LogsType, Log } from "../../types/index";
import LogItem from "./LogItem";
import styles from "./styles";

interface Props {
  logs: LogsType;
  navigation: any;
  logDeleted: (props: { timestamp: number }) => void;
}

const mapStateToProps = (state) => ({
  logs: selectLogs(state),
});

const mapDispatchToProps = {
  logDeleted,
};

function Logs(props: Props) {
  const { logs, navigation, logDeleted } = props;
  const { colors } = useTheme();

  function byTimestamp(a: Log, b: Log) {
    return b.timestamp - a.timestamp;
  }

  function onDelete(timestamp: number) {
    logDeleted({ timestamp });
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
            navigation.navigate("LogDetail", {
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
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
