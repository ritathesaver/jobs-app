import { Dimensions, PixelRatio } from "react-native";
import * as Device from "expo-device";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const SCALE = SCREEN_WIDTH > SCREEN_HEIGHT ? SCREEN_HEIGHT : SCREEN_WIDTH;

const BASE_WIDTH = 414;

const fontConfig = {
  phone: {
    small: { min: 0.8, max: 1 },
    medium: { min: 0.9, max: 1.1 },
    large: { min: 1, max: 1.2 },
  },
  tablet: {
    small: { min: 1.3, max: 1.4 },
    medium: { min: 1.4, max: 1.5 },
    large: { min: 1.5, max: 1.7 },
  },
};

export const getDeviceType = (): "phone" | "tablet" => {
  if (Device.deviceType === Device.DeviceType.TABLET) {
    return "tablet";
  } else {
    return "phone";
  }
};

const getScreenSizeCategory = (): "small" | "medium" | "large" => {
  if (SCALE < 450) return "small";
  if (SCALE > 750) return "large";
  return "medium";
};

export const getFontSize = (size: number): number => {
  const deviceType = getDeviceType();
  const screenCategory = getScreenSizeCategory();
  const config = fontConfig[deviceType][screenCategory];

  const scaleFactor = SCALE / BASE_WIDTH;

  const clampedScaleFactor = Math.min(
    Math.max(scaleFactor, config.min),
    config.max
  );

  let newSize = size * clampedScaleFactor;

  if (deviceType === "tablet") {
    newSize *= 1.1;
  }

  return (
    Math.round(PixelRatio.roundToNearestPixel(newSize)) /
    PixelRatio.getFontScale()
  );
};

export const adjustFontConfig = (
  deviceType: "phone" | "tablet",
  sizeCategory: "small" | "medium" | "large",
  minScale: number,
  maxScale: number
) => {
  fontConfig[deviceType][sizeCategory] = { min: minScale, max: maxScale };
};
