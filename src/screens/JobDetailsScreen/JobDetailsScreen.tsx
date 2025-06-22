import React, { FC, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../redux/hooks";
import { jobsDataSelector } from "../../redux/selectors/jobs";
import { TJobType } from "../../redux/types/jobsTypes";

const JobDetailsScreen: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { jobId } = route.params as { jobId: string };
  const [jobDetails, setJobDetails] = useState<TJobType>();
  const [isLoading, setIsLoading] = useState(true);
  console.log(jobId, jobDetails);

  const jobs = useAppSelector(jobsDataSelector);

  useEffect(() => {
    setJobDetails(jobs.find((item: TJobType) => item.jobId === jobId));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  if (!jobId || !jobDetails) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Job not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {jobDetails.jobTitle.name}
      </Text>
      <Text style={{ fontSize: 16, marginVertical: 10 }}>
        {jobDetails.company.name}
      </Text>
    </View>
  );
};

export default JobDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  imageContainer: {
    padding: 16,
    height: 300,
    width: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
