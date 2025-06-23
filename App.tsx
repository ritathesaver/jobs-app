import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import {
  useFonts,
  CourierPrime_700Bold,
  CourierPrime_400Regular,
} from "@expo-google-fonts/courier-prime";
import { ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded] = useFonts({
    CourierPrime_700Bold,
    CourierPrime_400Regular,
  });

  const ErrorFallback = ({ error }: FallbackProps) => {
    useEffect(() => {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Something went wrong",
        text2: error.message || "Unknown error",
      });
    }, [error]);

    return null;
  };
  if (!fontsLoaded) return <ActivityIndicator size="large" />;

  return (
    <>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <StatusBar style="auto" />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <RootStackNavigator />
              </GestureHandlerRootView>
            </ErrorBoundary>
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
      <Toast />
    </>
  );
}
