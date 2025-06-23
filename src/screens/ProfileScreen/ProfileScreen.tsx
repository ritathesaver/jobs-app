import React, { FC } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../../components/Text/Text";
import {
  profileDataSelector,
  profileLoadingSelector,
} from "../../redux/selectors/profile";
import { Entypo, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { formatPhone } from "../../utils/formatPhone";

const ProfileScreen: FC = () => {
  const profile = useAppSelector(profileDataSelector);
  const isLoading = useAppSelector(profileLoadingSelector);

  const distance = `${profile.maxJobDistance.toFixed(2)} miles`;

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <Text option="header">
            {profile.firstName} {profile.lastName}
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <FontAwesome6 name="location-dot" size={20} color="black" />
            <View style={styles.textWrapper}>
              <Text option="subheader">Your Location</Text>
              <Text>{profile.address.formattedAddress}</Text>
              <Text style={styles.subtext}>
                {distance} you are ready to travel to job
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Entypo name="email" size={20} color="black" />
            <View style={styles.textWrapper}>
              <Text option="subheader">Your Email</Text>
              <Text>{profile.email}</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <FontAwesome name="phone-square" size={20} color="black" />
            <View style={styles.textWrapper}>
              <Text option="subheader">Your Phone</Text>
              <Text>{formatPhone(profile.phoneNumber)}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textWrapper: {
    marginLeft: 8,
  },
  subtext: {
    color: "gray",
    fontSize: 12,
  },
  headerContainer: {
    marginBottom: 20,
  },
});
