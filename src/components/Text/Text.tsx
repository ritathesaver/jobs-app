import React from "react";
import { Text as RNText, StyleSheet, TextStyle } from "react-native";
import { TextProps, TTextOption } from "./types";
import { getFontSize } from "./getFontSize";

const getStyleByOption = (option: TTextOption): TextStyle => {
  switch (option) {
    case "header":
      return styles.header;
    case "subheader":
      return styles.subheader;
    case "footnote":
      return styles.footnote;
    case "body":
    default:
      return styles.body;
  }
};

const Text = ({ option = "body", style, ...props }: TextProps) => {
  return <RNText {...props} style={[getStyleByOption(option), style]} />;
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "CourierPrime_700Bold",
    fontSize: getFontSize(24),
  },
  subheader: {
    fontFamily: "CourierPrime_700Bold",
    fontSize: getFontSize(18),
  },
  body: {
    fontSize: getFontSize(16),
  },
  footnote: {
    fontSize: getFontSize(14),
  },
});

export default Text;
