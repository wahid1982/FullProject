import React, { memo } from "react";
import { TouchableOpacity, ImageBackground, View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  IndexPath,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { LineChart } from "react-native-chart-kit";
import { chartConfig } from "utils/chartConfig";
import { Images } from "assets/images";
import TabBar from "components/TabBar";
import Flex from "components/Flex";
import BottomStats from "./BottomStats";

const MyStats = memo(() => {
  const { height, width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["more", "common"]);
  const [focusIndex, setFocusIndex] = React.useState(8);
  const [activeTab, setActiveTab] = React.useState(0);

  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(1));
  const [selectYear, setYear] = React.useState<IndexPath | IndexPath[]>(
    new IndexPath(0)
  );

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={
          <Flex itemsCenter style={{ width: width - 48 }}>
            <NavigationAction />
            <Flex>
              <Select
                selectedIndex={selectedIndex}
                onSelect={(index) => setSelectedIndex(index)}
                placeholder="Select one"
                style={styles.consider}
                size="giant"
                status="primary"
                /* @ts-ignore */
                value={DATA_SELECT_1[selectedIndex - 1]}
              >
                {DATA_SELECT_1.map((item, i) => {
                  return <SelectItem title={item} key={i} />;
                })}
              </Select>
              <Select
                selectedIndex={selectYear}
                onSelect={(index) => setYear(index)}
                placeholder="Select one"
                style={styles.consider}
                size="giant"
                status="primary"
                /* @ts-ignore */
                value={DATA_SELECT_2[selectYear - 1]}
              >
                {DATA_SELECT_2.map((item, i) => {
                  return <SelectItem title={item} key={i} />;
                })}
              </Select>
            </Flex>
          </Flex>
        }
      />
      <Content contentContainerStyle={styles.content}>
        <LineChart
          data={{
            labels: ["APR", "MAY", "JUB", "JUL", "AUG", "SEP"],
            datasets: [
              {
                data: DATA,
              },
            ],
          }}
          width={width - 36 + (width - 36) / (DATA.length - 1)}
          height={260 * (height / 812)}
          formatYLabel={(yValue) => `${yValue}k`}
          chartConfig={chartConfig}
          yLabelsOffset={4}
          xLabelsOffset={-4}
          yAxisInterval={120}
          bezier
          segments={4}
          withInnerLines={false}
          withOuterLines={false}
          onDataPointClick={(data) => {
            setFocusIndex(data.index);
          }}
          renderDotContent={({ x, y, index }) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  position: "absolute",
                  top: y - 48,
                  left: x - 36,
                }}
              >
                <ImageBackground
                  source={Images.shape}
                  style={{
                    width: 70,
                    height: 40,
                    opacity: focusIndex === index ? 1 : 0,
                  }}
                  imageStyle={{ width: 70, height: 40 }}
                >
                  <Text
                    category="h8"
                    center
                    status="primary"
                    mt={6}
                  >{`$${DATA[index]}`}</Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
          fromZero
        />
        <View style={styles.tabBar}>
          <TabBar
            selectedIndex={activeTab}
            onChange={setActiveTab}
            tabs={[t("income"), t("jobs")]}
            width={140}
            height={30}
          />
        </View>
        <BottomStats
          time="Sep 2019"
          totalTime="Jan 2019"
          totalIncome={"$36,356"}
          income={"$2,356"}
          growIncome={"32.48%"}
          jobsDone={6}
          totalJobs={265}
          growJob={"24.5%"}
        />
      </Content>
    </Container>
  );
});

export default MyStats;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 40,
    paddingBottom: 60,
  },
  consider: {
    width: 93,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabBar: {
    borderBottomWidth: 1,
    borderColor: "background-basic-color-3",
    marginHorizontal: 24,
    paddingBottom: 32,
    marginBottom: 40,
  },
});
export const DATA = [6.111, 6.912, 4.321, 5.291, 6.867, 8, 7];
const DATA_SELECT_1 = ["Yearly", "Monthly", "Daily"];
const DATA_SELECT_2 = ["2018", "2019", "2020", "2021", "2022"];
