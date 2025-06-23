import { type StyleProp, type ViewStyle } from "react-native";
import { type EButtonTheme } from "../../consts/buttonThemes";

export interface IButtonProps {
  glowed?: boolean;
  disabled?: boolean;
  theme?: EButtonTheme;
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
