import type {
  NavigatorScreenParams,
  ParamListBase,
} from "@react-navigation/native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export interface RootTabParamList extends ParamListBase {
  Jobs: undefined;
  Profile: undefined;
}

export interface RootStackParamList extends ParamListBase {
  Tabs: NavigatorScreenParams<RootTabParamList>;
  JobDetails: {
    jobId: string;
  };
}

export type JobsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Tabs"
>;

export type RootStackScreen<RouteName extends keyof RootStackParamList = any> =
  NativeStackScreenProps<RootStackParamList, RouteName>;
