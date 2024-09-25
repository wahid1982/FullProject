import React, { memo } from "react";
import { View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";

interface BottomStatsProps {
  time: string;
  totalTime: string;
  income: string;
  growIncome: string;
  totalIncome: string;
  jobsDone: number;
  totalJobs: number;
  growJob: string;
}

const BottomStats = memo(
  ({
    time,
    totalTime,
    income,
    growIncome,
    growJob,
    jobsDone,
    totalJobs,
    totalIncome,
  }: BottomStatsProps) => {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const { t } = useTranslation(["more", "common"]);
    return (
      <View style={styles.container}>
        <Text category="h8" uppercase mb={16}>
          {t("income")}
        </Text>
        <Flex>
          <View>
            <Text category="h8-s">This month, {time}</Text>
            <Flex mt={8} justify="flex-start" style={styles.content}>
              <Text category="h5" mb={-1}>
                {income}
              </Text>
              <Icon
                pack="assets"
                name="increase"
                style={[
                  globalStyle.icon16,
                  {
                    tintColor: theme["color-success-100"],
                  },
                ]}
              />
              <Text category="h8" status={"success"}>
                {growIncome}
              </Text>
            </Flex>
          </View>
          <View>
            <Text category="h8-s">This month, {totalTime}</Text>
            <Flex mt={8} justify="flex-start" style={styles.content}>
              <Text category="h5">{totalIncome}</Text>
            </Flex>
          </View>
        </Flex>
        <Text category="h8" uppercase mt={32} mb={16}>
          {t("jobs")}
        </Text>
        <Flex>
          <View>
            <Text category="h8-s">This month, {time}</Text>
            <Flex mt={8} justify="flex-start" style={styles.content}>
              <Text category="h5" mb={-1}>
                {jobsDone}
              </Text>
              <Icon
                pack="assets"
                name="increase"
                style={[
                  globalStyle.icon16,
                  {
                    tintColor: theme["color-success-100"],
                  },
                ]}
              />
              <Text category="h8" status={"success"}>
                {growJob}
              </Text>
            </Flex>
          </View>
          <View>
            <Text category="h8-s">This month, {totalTime}</Text>
            <Flex mt={8} justify="flex-start" style={styles.content}>
              <Text category="h5">{totalJobs}</Text>
            </Flex>
          </View>
        </Flex>
      </View>
    );
  }
);

export default BottomStats;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    alignItems: "flex-end",
  },
});
