import { StyleSheet } from "react-native";
import { width } from "../../constants/layout";
import type from "../../constants/type";

export default StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
  cardWrapper: {
    flex: 1,
    flexGrow: 0,
    flexBasis: "50%",
  },
  cardContainer: {
    paddingVertical: 32,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    marginBottom: 16,
    shadowOpacity: 0,
    elevation: 0,
  },
  cardStyle: {
    alignItems: "center",
  },
  cardValue: {
    ...type.header,
    marginBottom: 8,
  },
  cardLabel: type.body,
});
