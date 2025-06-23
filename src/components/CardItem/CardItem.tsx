import React, { memo, type FC } from "react";
import { StyleSheet, View } from "react-native";
import Text from "../Text/Text";
import { ICardItemProps } from "./types";

const CardItem: FC<ICardItemProps> = ({
  jobName,
  wagePerHourInCents,
  companyName,
  branch,
  milesToTravel,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text option="subheader" style={styles.title}>
          {jobName}
        </Text>
      </View>
      <View style={styles.wageContainer}>
        <Text>{wagePerHourInCents} $/hour</Text>
      </View>

      <Text style={styles.title}>{`${companyName}, ${branch}`}</Text>
      <Text option="footnote" style={styles.title}>
        {`${milesToTravel} miles from you`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 20,
    borderColor: "black",
    justifyContent: "center",
  },
  title: {
    color: "black",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
  wageContainer: {
    alignItems: "flex-end",
    paddingBottom: 8,
  },
});

export default memo(CardItem);
