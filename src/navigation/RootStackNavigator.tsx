import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import RootTabNavigator from "./RootTabNavigator";
import JobDetailsScreen from "../screens/JobDetailsScreen/JobDetailsScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "../components/Header/Header";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name={"Tabs"}
        component={RootTabNavigator}
      />
      <Stack.Screen
        options={{
          header: () => (
            <Header
              leftIcon={
                <Ionicons name="chevron-back" size={24} color="black" />
              }
              title=""
            />
          ),
        }}
        name={"JobDetails"}
        component={JobDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
