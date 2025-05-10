import React from "react";
import { StyleSheet, Appearance } from "react-native";

const isDark = Appearance.getColorScheme() == "dark";

export const lightModeColors = {
  title: "#0047ab",
  text: "#222222",
  text2: "#333333",
  placeholderText: "#000000",
  background: "#f8f9fb", // subtle blue-ish white
  backgroundInner: "#fefefe",
  border: "#dce6f1",
  shadow: "#000000",
  warning: "#ff5555",
  navigationBackground: "#ffffff",
  navigationText: "#000000",
};

export const darkModeColors = {
  title: "#0081ef",
  text: "#eeeeee",
  text2: "#cccccc",
  placeholderText: "#aaaaaa",
  background: "#121212",
  backgroundInner: "#252525",
  border: "#626262",
  shadow: "#ffffff",
  warning: "#f4511e",
  warningText: "#eeeeee",
  navigationBackground: "#101010",
  navigationText: "#ffffff",
};

export const colors = isDark ? darkModeColors : lightModeColors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  flexRow: {
    flexDirection: "row",
  },
  scrollContainer: {},
  bioContainer: {
    maxHeight: 200,
    padding: 10,
    margin: 10,
    backgroundColor: colors.backgroundInner,
    borderRadius: 12,
  },
  bioText: {
    color: colors.text,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },
  card: {
    flexShrink: 0,
    padding: 10,
    margin: 10,
    backgroundColor: colors.backgroundInner,
    borderRadius: 10,
    width: 165,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    height: 215,
    width: 145,
    borderRadius: 10,
    resizeMode: "cover",
  },
  cardText: {
    color: colors.text,
  },
  personImage: {
    height: 215,
    width: 145,
  },
  cardTitle: {
    fontSize: 20,
    color: colors.title,
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 0.5,
    paddingVertical: 5,
  },

  cardContent: {
    alignItems: "center",
    textAlign: "center",
    color: colors.text,
  },
  search: {
    height: 40,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 15,
    backgroundColor: colors.backgroundInner,
    margin: 10,
    borderRadius: 20, // softened corners
    color: colors.text2,
  },
  offlineWarning: {
    backgroundColor: colors.warning,
    color: colors.warningText,
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
  titleText: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.title,
    textAlign: "center",
    letterSpacing: 0.5,
    marginVertical: 1,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textTransform: "uppercase",
  },
  subtitleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.title,
    textAlign: "left",
    letterSpacing: 0.5,
    marginVertical: 1,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    padding: 10,
  },
  labelText: {
    fontWeight: "bold",
    padding: 10,
    color: colors.text2,
  },
  bodyText: {
    padding: 10,
    color: colors.text,
  },
  personInfo: {
    width: 220,
  },
  personTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.title,
    textAlign: "left",
    letterSpacing: 0.5,
    marginVertical: 1,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textTransform: "uppercase",
    paddingHorizontal: 10,
  },
  navigator: {
    backgroundColor: "#000000",
  },
});
