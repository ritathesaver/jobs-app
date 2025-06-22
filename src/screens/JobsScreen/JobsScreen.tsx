import React, { FC, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getJobsAction } from "../../redux/slices/jobs";
import { jobsDataSelector } from "../../redux/selectors/jobs";
import { TJobType } from "../../redux/types/jobsTypes";
import { Image } from "expo-image";

const JobsScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const jobs = useAppSelector(jobsDataSelector);

  console.log(jobs, "JOBS");

  useEffect(() => {
    dispatch(getJobsAction());
  }, []);

  const navigateToDetails = (id: string) => {
    navigation.navigate("JobDetails", { jobId: id });
  };

  const renderItem = ({ item }: { item: TJobType }) => (
    <TouchableOpacity
      onPress={() => navigateToDetails(item.jobId)}
      style={styles.itemContainer}
    >
      <Text style={styles.title}>{item.jobTitle.name}</Text>
      <Text>{item.company.name}</Text>
      <View style={{ width, height: 200 }}>
        <Image
          contentFit="contain"
          transition={1000}
          style={{ flex: 1 }}
          source={{ uri: item.jobTitle.imageUrl }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item) => item.jobId}
      />
    </SafeAreaView>
  );
};

export default JobsScreen;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});
