import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import BookingItem, { BookingItemProps } from "../components/BookingItem";
import TitleList from "../components/TitleList";
import { MainBottomTabStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";
import { Images } from "assets/images";
import EmptyData from "../components/EmptyData";
import { Request_Type_Enum } from "constants/Types";

interface BookingsTabProps {
  currentData: BookingItemProps[];
  passData: BookingItemProps[];
}

const BookingsTab = memo(({ passData, currentData }: BookingsTabProps) => {
  const { navigate } =
    useNavigation<NavigationProp<MainBottomTabStackParamList>>();
  const styles = useStyleSheet(themedStyles);

  const onSeeAllPast = () => {
    navigate("Requests", {
      screen: "RequestsInPast",
      params: { requestType: Request_Type_Enum.Booking },
    });
  };
  const { t } = useTranslation(["requests", "common"]);

  return (
    <View style={styles.container}>
      {currentData === undefined && passData === undefined ? (
        <EmptyData
          image={Images.noBooking}
          title={t("noBooking")}
          description={t("noBookingTitle")}
        />
      ) : (
        <>
          <TitleList current dataLength={currentData.length} />
          {currentData.map((item, i) => {
            return <BookingItem item={item} key={i} />;
          })}
          <View style={styles.passContent}>
            <TitleList
              current={false}
              dataLength={passData.length}
              onSeeAll={onSeeAllPast}
            />
            {passData.map((item, i) => {
              return <BookingItem item={item} key={i} />;
            })}
          </View>
        </>
      )}
    </View>
  );
});

export default BookingsTab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  passContent: {
    marginTop: 12,
  },
  empty: {
    alignItems: "center",
    marginTop: 120,
  },
});
