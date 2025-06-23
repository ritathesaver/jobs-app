import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  Text,
  Dimensions,
} from "react-native";
import React, { useCallback, useMemo, useState, FC } from "react";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { EButtonTheme, ButtonThemeStyles } from "../../consts/buttonThemes";
import { type IButtonProps } from "./types";

const { height } = Dimensions.get("window");

const BUTTON_HEIGHT_SMALL = 40;
const BUTTON_HEIGHT_LARGE = 56;

const isLargeScreen = height >= 900;

const Button: FC<IButtonProps> = ({
  glowed = false,
  disabled = false,
  theme = disabled ? EButtonTheme.DISABLED : EButtonTheme.SOLID,
  title,
  onPress,
  style,
}) => {
  const animatedValue = useSharedValue(0);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const onPressIn = useCallback(() => {
    setIsPressed(true);
    animatedValue.value = withTiming(1, {
      easing: Easing.ease,
      duration: 100,
    });
  }, [animatedValue]);

  const onPressOut = useCallback(() => {
    setIsPressed(false);
    animatedValue.value = withTiming(0, {
      easing: Easing.ease,
      duration: 100,
    });
  }, [animatedValue]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedValue.value,
      [0, 1],
      [
        ButtonThemeStyles[theme].backgroundColor,
        ButtonThemeStyles[theme].pressedBackgroundColor,
      ]
    ),
    borderColor: interpolateColor(
      animatedValue.value,
      [0, 1],
      [
        ButtonThemeStyles[theme].borderColor,
        ButtonThemeStyles[theme].pressedBorderColor,
      ]
    ),
  }));

  const textColorStyle = useMemo<StyleProp<TextStyle>>(
    () => ({
      color: isPressed
        ? ButtonThemeStyles[theme].pressedTitleColor
        : ButtonThemeStyles[theme].titleColor,
    }),
    [isPressed, theme]
  );

  return (
    <View
      style={[
        styles.container,
        glowed && styles.glowedContainer,
        glowed && styles.glowShadow,
        style,
      ]}
    >
      <Animated.View
        testID="button-pressable"
        style={[styles.wrapper, animatedContainerStyle]}
      >
        <Pressable
          disabled={disabled}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={styles.touchContainer}
        >
          <Text testID="button-title" numberOfLines={1} style={textColorStyle}>
            {title}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glowedContainer: {
    paddingVertical: 40,
  },
  wrapper: {
    overflow: "hidden",
    height: isLargeScreen ? BUTTON_HEIGHT_LARGE : BUTTON_HEIGHT_SMALL,
    borderRadius: 8,
    borderWidth: 1,
  },
  glowShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    backgroundColor: "mint",
  },
  touchContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
