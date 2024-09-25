import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  ViewPager,
  Layout,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

import Content from "components/Content";
import Container from "components/Container";
import BasicTabBar from "components/BasicTabBar";
import { Images } from "assets/images";
import NavigationAction from "components/NavigationAction";
import { CaregiverCardProps, Onl_State_Types_Enum } from "constants/Types";
import { globalStyle } from "styles/globalStyle";
import CaregiverCard from "./components/CaregiverCard";
import { FlatList } from "react-native-gesture-handler";

const MyJobProfile = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["more", "common"]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const shouldLoadComponent = (index: number) => index === activeIndex;

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("myJobProfile").toString()}
        accessoryLeft={<NavigationAction />}
      />
      <FlatList
        data={[0]}
        stickyHeaderIndices={[0]}
        renderItem={() => {
          return (
            <Layout>
              <BasicTabBar
                style={styles.tabBar}
                activeIndex={activeIndex}
                onChange={setActiveIndex}
                tabs={[t("openJob"), t("closeJob")]}
              />
            </Layout>
          );
        }}
        ListFooterComponent={() => (
          <ViewPager
            onSelect={setActiveIndex}
            selectedIndex={activeIndex}
            shouldLoadComponent={shouldLoadComponent}
          >
            <Content padder style={styles.content}>
              <CaregiverCard item={DATA_USER} />
            </Content>
            <Content padder style={styles.content}></Content>
          </ViewPager>
        )}
      />
    </Container>
  );
});

export default MyJobProfile;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tabBar: {
    marginTop: 24,
  },
  content: {
    marginTop: 24,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    ...globalStyle.shadow,
  },
});
const DATA_USER: CaregiverCardProps = {
  name: "Edith Johnson",
  age: 28,
  yearExp: 6,
  location: "Rochester, NY",
  gender: "female",
  rate: { rateNumber: 4.68, review: 215 },
  avatar: Images.avatar2,
  price: "$15-$20/hr",
  caredFamily: 192,
  backgroundCheck: true,
  carePro: true,
  onlineStatus: Onl_State_Types_Enum.Online,
};
