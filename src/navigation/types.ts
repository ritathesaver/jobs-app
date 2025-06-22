import type {
  NavigatorScreenParams,
  ParamListBase,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export interface RootTabParamList extends ParamListBase {
  Jobs: undefined;
  Profile: undefined;
}

export interface JobsStackParamList extends ParamListBase {
  JobsList: undefined;
  JobDetails: {
    jobId: string;
  };
}

export interface RootStackParamList extends ParamListBase {
  Tabs: NavigatorScreenParams<RootTabParamList>;
}
export type RootStackScreen<RouteName extends keyof RootStackParamList = any> =
  NativeStackScreenProps<RootStackParamList, RouteName>;
