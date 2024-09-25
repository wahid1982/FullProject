import React, { memo, useEffect } from "react";
import { View, FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  ViewPager,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import Container from "components/Container";
import { globalStyle } from "styles/globalStyle";
import keyExtractor from "utils/keyExtractor";
import BasicTabBar from "components/BasicTabBar";
import {
  DATA_CURRENT_BOOKING,
  DATA_PASS_BOOKING,
  DATA_PAST_INTERVIEW,
} from "constants/Data"; // Removed DATA_CURRENT_INTERVIEW for dynamic setting
import { RequestsStackParamList } from "navigation/types";
import InterviewTab from "./Interview/InterviewTab";
import BookingsTab from "./Bookings/BookingsTab";
import ApplicationsTab from "./Applications/ApplicationsTab";
import { GetInvoiceListView as apiGetInvoiceListView } from "../../utils/appwrite";

const RequestsSrc = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RequestsStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["requests", "common"]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const shouldLoadComponent = (index: number) => index === activeIndex;

  // Step 2: Set up state for current and past interviews
  const [dataCurrent, setCurrent] = React.useState([]);
  const [dataPast, setPast] = React.useState(DATA_PAST_INTERVIEW);
  const [loading, setLoading] = React.useState(true);
  
  // Step 1: Function to fetch API data
  const fetchCurrentInterviews = async () => {
    try {
      setLoading(true);  // Start loading
      const response = await apiGetInvoiceListView();

      setCurrent(response); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching current interviews:", error);
    }
  };

  // Step 3: Use effect to call the API when component mounts
  useEffect(() => {
    fetchCurrentInterviews();
  }, []); // Empty dependency array means this runs once on component mount

  const ListFooterComponent = React.useCallback(() => {
    return (
      <View style={styles.footer}>
        <ViewPager
          selectedIndex={activeIndex}
          onSelect={setActiveIndex}
          style={[globalStyle.flexOne]}
          swipeEnabled={false}
          shouldLoadComponent={shouldLoadComponent}
        >
          <InterviewTab
            dataCurrentRequest={dataCurrent}
            dataPassRequest={dataPast}
          />
          <BookingsTab
            currentData={DATA_CURRENT_BOOKING}
            passData={DATA_PASS_BOOKING}
          />
          <ApplicationsTab />
        </ViewPager>
      </View>
    );
  }, [activeIndex, dataCurrent, dataPast]);

  const ListHeaderComponent = React.useCallback(() => {
    return (
      <Layout>
        <BasicTabBar
          style={styles.tabBar}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          tabs={[t("Invoices"), t("Closed"), t("applications")]}
        />
      </Layout>
    );
  }, [activeIndex]);

  return (
    <Container style={styles.container}>
      <TopNavigation title={t("title").toString()} />
      <FlatList
        renderItem={() => <></>}
        stickyHeaderIndices={[0]}
        keyExtractor={keyExtractor}
        data={[0]}
        contentContainerStyle={styles.content}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
});

export default RequestsSrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {},
  tabBar: {
    marginTop: 12,
    paddingHorizontal: 12,
  },
  footer: {
    marginHorizontal: 24,
    paddingBottom: 40,
  },
});
