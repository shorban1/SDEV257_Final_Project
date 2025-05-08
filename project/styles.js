import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
  },
  scrollContainer: {},
  bioContainer: {
    maxHeight: 200,
    padding: 10,
    margin: 10,
    backgroundColor: "#fefefe",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    flexShrink: 0,
    padding: 10,
    margin: 10,
    backgroundColor: "#fefefe",
    borderRadius: 10,
    width: 165,
  },

  cardImage: {
    height: 215,
    width: 145,
  },
  cardTitle: {
    fontSize: 20,
    color: "#0066ff",
    textAlign: "center",
  },
  cardContent: {
    alignItems: "center",
    textAlign: "center",
  },
  search: {
    height: 35,
    borderColor: "#dedede",
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: "#fefefe",
    margin: 10,
    marginBottom: 0,
  },
  offlineWarning: {
    backgroundColor: "#ff5555",
    color: "#ffffff",
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
});
