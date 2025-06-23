import React, { type FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { type RootStackScreen, type RootTabParamList } from "./types";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import JobsScreen from "../screens/JobsScreen/JobsScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import Animated from "react-native-reanimated";

const Tab = createBottomTabNavigator<RootTabParamList>();

const RootTabNavigator: FC<RootStackScreen<"Tabs">> = () => {
  return (
    <Tab.Navigator
      initialRouteName="Jobs"
      screenOptions={() => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Jobs"
        component={JobsScreen}
        options={{
          title: "Jobs",
          tabBarIcon: ({ focused }) => (
            <Animated.View
              style={{
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            >
              <FontAwesome5
                name="list-alt"
                size={20}
                color={focused ? "black" : "gray"}
              />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Animated.View
              style={{
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            >
              <FontAwesome5
                name="user"
                size={20}
                color={focused ? "#black" : "gray"}
              />
            </Animated.View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootTabNavigator;
