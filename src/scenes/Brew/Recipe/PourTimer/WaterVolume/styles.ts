import { StyleSheet } from "react-native";
import type from "../../../../../constants/type";

export default StyleSheet.create({
  section: {
    flex: 1,
    justifyContent: "space-around",
  },
  labelText: {
    ...type.label,
    textAlign: "center",
    marginBottom: 12,
  },
  trackingContainer: {
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: "rgba(82,181,146,1)",
    shadowRadius: 12,
    shadowOffset: { height: 2, width: 0 },
    marginHorizontal: 8,
  },
  trackingLabelText: {
    ...type.label,
    minWidth: 100,
    textAlign: "center",
    paddingBottom: 4,
  },
  trackingText: {
    ...type.header,
    letterSpacing: 0,
    fontWeight: "bold",
  },
});
