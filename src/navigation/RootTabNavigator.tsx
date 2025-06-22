import React, { type FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { type RootStackScreen, type RootTabParamList } from "./types";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import JobsScreen from "../screens/JobsScreen/JobsScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";

const Tab = createBottomTabNavigator<RootTabParamList>();

const RootTabNavigator: FC<RootStackScreen<"Tabs">> = () => {
  return (
    <Tab.Navigator
      initialRouteName="Jobs"
      screenOptions={() => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Jobs"
        component={JobsScreen}
        options={{
          title: "Jobs",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name="list-alt" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name="user" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootTabNavigator;
