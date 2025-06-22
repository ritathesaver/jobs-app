import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import { Provider } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
