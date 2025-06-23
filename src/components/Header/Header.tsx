import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IHeaderProps } from "./types";

const Header: React.FC<IHeaderProps> = ({
  title,
  isLeftButtonShown = true,
  leftIcon,
}) => {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const onPress = () => navigation.goBack();

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          {
            paddingTop: Math.max(top, 16),
          },
        ]}
      >
        <View style={styles.iconWrapper}>
          {isLeftButtonShown && (
            <TouchableOpacity hitSlop={32} onPress={onPress}>
              {leftIcon}
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.title}>{title ?? ""}</Text>
        <View style={styles.iconWrapper} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: Dimensions.get("window").width,
    backgroundColor: "white",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  iconWrapper: {
    width: 48,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    letterSpacing: -0.1,
    color: "black",
  },
});

export default Header;
