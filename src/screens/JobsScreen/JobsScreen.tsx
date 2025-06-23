import React, { FC, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getJobsAction } from "../../redux/slices/jobs";
import {
  jobsDataSelector,
  jobsLoadingSelector,
} from "../../redux/selectors/jobs";
import { TJobType } from "../../redux/types/jobsTypes";
import Text from "../../components/Text/Text";
import { getProfileAction } from "../../redux/slices/profile";
import { JobsScreenNavigationProp } from "../../navigation/types";
import CardItem from "../../components/CardItem/CardItem";

const JobsScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<JobsScreenNavigationProp>();

  const jobs = useAppSelector(jobsDataSelector);
  const isLoading = useAppSelector(jobsLoadingSelector);

  useEffect(() => {
    dispatch(getJobsAction());
    dispatch(getProfileAction());
  }, []);

  const navigateToDetails = (id: string) => {
    navigation.navigate("JobDetails", { jobId: id });
  };

  const listEmptyComponent = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text option="subheader">No jobs available now, come back later</Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: TJobType }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item.jobId)}>
      <CardItem
        jobName={item.jobTitle.name}
        wagePerHourInCents={(item.wagePerHourInCents / 100).toFixed(2)}
        companyName={item.company.name}
        branch={item.branch}
        milesToTravel={item.milesToTravel}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.header} option="header">
          Jobs for you
        </Text>
        <FlatList
          data={jobs ?? []}
          renderItem={renderItem}
          keyExtractor={(item) => item.jobId}
          ListEmptyComponent={listEmptyComponent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default JobsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    width: "100%",
    height: 20,
  },
  header: {
    paddingVertical: 16,
  },
});
