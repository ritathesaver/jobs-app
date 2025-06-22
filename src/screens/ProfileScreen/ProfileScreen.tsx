import React, { FC, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getProfileAction } from "../../redux/slices/profile";
import {
  profileDataSelector,
  profileLoadingSelector,
} from "../../redux/selectors/profile";

const ProfileScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const profile = useAppSelector(profileDataSelector);
  const isLoading = useAppSelector(profileLoadingSelector);

  useEffect(() => {
    dispatch(getProfileAction());
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  if (!profile) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Job not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text>{profile.firstName}</Text>
        <Text>{profile.lastName}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
    padding: 16,
    height: 32,
    width: 32,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
