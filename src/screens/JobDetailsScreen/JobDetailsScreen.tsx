import React, { FC, useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useAppSelector } from "../../redux/hooks";
import { jobsDataSelector } from "../../redux/selectors/jobs";
import { TJobType } from "../../redux/types/jobsTypes";
import { JobDetailsRouteProp } from "./types";
import Text from "../../components/Text/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useImageAspectRatio } from "../../utils/useImageAspectRatio";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/Button/Button";
import { EButtonTheme } from "../../consts/buttonThemes";
import { formatPhone } from "../../utils/formatPhone";
import Toast from "react-native-toast-message";
import { profileDataSelector } from "../../redux/selectors/profile";
import { acceptJobByProfile, rejectJobByProfile } from "../../api/services";

const JobDetailsScreen: FC = () => {
  const route = useRoute<JobDetailsRouteProp>();
  const { jobId } = route.params;
  const [jobDetails, setJobDetails] = useState<TJobType>();
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();
  const aspectRatio = useImageAspectRatio(jobDetails?.jobTitle.imageUrl ?? "");

  const jobs = useAppSelector(jobsDataSelector);
  const profile = useAppSelector(profileDataSelector);

  useEffect(() => {
    const found = jobs.find((item: TJobType) => item.jobId === jobId);
    if (found) setJobDetails(found);
    setIsLoading(false);
  }, [jobs, jobId]);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (!jobId || !jobDetails) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Job not found</Text>
      </View>
    );
  }
  const hourlyRate = (jobDetails.wagePerHourInCents / 100).toFixed(2);
  const distance = `${jobDetails.milesToTravel.toFixed(2)} miles`;

  const shiftDates = jobDetails.shifts
    .slice(0, 2)
    .map((shift: any, index: number) => {
      const start = toZonedTime(
        shift.startDate,
        jobDetails.company?.address?.zoneId
      );
      const end = toZonedTime(
        shift.endDate,
        jobDetails.company?.address?.zoneId
      );

      return (
        <Text key={index}>
          {format(start, "MMM d, EEE h:mmaaa")} - {format(end, "h:mmaaa z")}
        </Text>
      );
    });

  const acceptJobHandler = async (jobId: string, workerId: string) => {
    const response = await acceptJobByProfile(workerId, jobId);

    if (response.success) {
      Toast.show({
        type: "success",
        text1: "Your application has been submitted",
      });
    } else {
      Toast.show({
        type: "error",
        text1: response.message || "An error occurred",
      });
    }
  };

  const rejectJobHandler = async (jobId: string, workerId: string) => {
    const response = await rejectJobByProfile(workerId, jobId);

    if (response.success) {
      Toast.show({
        type: "info",
        text1: "You rejected this job",
      });
    } else {
      Toast.show({
        type: "error",
        text1: response.message || "An error occurred",
      });
    }
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <ScrollView style={styles.wrapper}>
        {aspectRatio ? (
          <View
            style={{ width: width - 32, height: (width - 32) / aspectRatio }}
          >
            <Image
              source={jobDetails.jobTitle.imageUrl}
              style={{ flex: 1 }}
              contentFit="cover"
            />
          </View>
        ) : (
          <ActivityIndicator size="small" />
        )}

        <Text option="header">{jobDetails.jobTitle.name}</Text>
        <Text>{jobDetails.company.name}</Text>
        <View style={styles.header}>
          <Text option="subheader">{distance}</Text>
          <Text option="subheader">{hourlyRate} ¢/hour</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <FontAwesome name="calendar" size={20} color="black" />
            <View style={styles.textWrapper}>
              <Text option="subheader">Shift Dates</Text>
              {shiftDates}
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <FontAwesome6 name="location-dot" size={20} color="black" />
            <View style={styles.textWrapper}>
              <Text option="subheader">Location</Text>
              <Text>{jobDetails.company?.address?.formattedAddress}</Text>
              <Text style={styles.subtext}>
                {distance} from your job search location
              </Text>
            </View>
          </View>
        </View>
        {jobDetails.requirements && (
          <View style={styles.section}>
            <View style={styles.row}>
              <FontAwesome6 name="screwdriver-wrench" size={20} color="black" />
              <View style={styles.textWrapper}>
                <Text option="subheader">Requirements</Text>
                {jobDetails.requirements.map((req: string, idx: number) => (
                  <Text key={idx}>• {req}</Text>
                ))}
              </View>
            </View>
          </View>
        )}
        <View style={styles.section}>
          <View style={styles.row}>
            <FontAwesome name="user-circle" size={20} color="black" />
            <View style={styles.textWrapper}>
              <Text option="subheader">Report To</Text>
              <Text>
                {`${jobDetails.company.reportTo.name} `}
                {formatPhone(jobDetails.branchPhoneNumber)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          theme={EButtonTheme.OUTLINE}
          onPress={() => rejectJobHandler(jobId, profile.workerId)}
          title="No thanks"
          style={{ marginRight: 10 }}
        />
        <Button
          glowed
          theme={EButtonTheme.SOLID}
          onPress={() => acceptJobHandler(jobId, profile.workerId)}
          title="I'll Take it"
        />
      </View>
    </SafeAreaView>
  );
};

export default JobDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    borderBottomWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  distance: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  rate: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  subtext: {
    color: "gray",
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  textWrapper: {
    marginLeft: 8,
  },
});
