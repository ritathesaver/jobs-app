import { TextProps as RNTextProps } from "react-native";

export type TTextOption = "header" | "subheader" | "body" | "footnote";

export interface TextProps extends RNTextProps {
  option?: TTextOption;
}
