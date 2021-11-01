import { StyleSheet, TextStyle } from "react-native";
import type from "../../constants/type";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: type.body as TextStyle,
  subContainer: {
    flex: 1,
  },
  description: type.caption as TextStyle,
  input: {
    ...type.body,
    width: 48,
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 13,
  },
});

export default styles;
