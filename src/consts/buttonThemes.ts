export enum EButtonTheme {
  SOLID,
  OUTLINE,
  DISABLED,
}

export const ButtonThemeStyles = {
  [EButtonTheme.SOLID]: {
    backgroundColor: "#000000",
    pressedBackgroundColor: "#000000",
    borderColor: "#000000",
    pressedBorderColor: "#98FF98",
    titleColor: "#FFFFFF",
    pressedTitleColor: "#FFFFFF",
  },
  [EButtonTheme.OUTLINE]: {
    backgroundColor: "transparent",
    pressedBackgroundColor: "transparent",
    borderColor: "#000000",
    pressedBorderColor: "#98FF98",
    titleColor: "#000000",
    pressedTitleColor: "#000000",
  },
  [EButtonTheme.DISABLED]: {
    backgroundColor: "#808080",
    pressedBackgroundColor: "#808080",
    borderColor: "#808080",
    pressedBorderColor: "#808080",
    titleColor: "#FFFFFF",
    pressedTitleColor: "#FFFFFF",
  },
};
