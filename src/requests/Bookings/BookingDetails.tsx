import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
  Button,
} from "@ui-kitten/components";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import {
  BookingDetailsScreenNavigationProp,
  RootStackParamList,
} from "navigation/types";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import UserField from "../components/UserField";
import Flex from "components/Flex";
import dayjs from "utils/dayjs";
import { globalStyle } from "styles/globalStyle";
import Weekdays from "src/find/components/Weekdays";
import { Request_Status_Type_Enum } from "constants/Types";

const BookingDetails = memo(() => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { width, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["requests", "common"]);
  const route = useRoute<BookingDetailsScreenNavigationProp>();
  const statusRequest = route.params.type;

  const onAccept = () => {};
  const onDecline = () => {
    goBack();
  };
  const onSendMessage = () => {};
  const onAddToCalendar = () => {};
  const onConfirmHour = () => {
    navigate("RequestStack", { screen: "ConfirmHour" });
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("requestDetails").toString()}
        accessoryLeft={<NavigationAction />}
      />
      <Text
        center
        category="h8"
        status={
          statusRequest === "Completed"
            ? "completed"
            : statusRequest === "Accepted"
            ? "info"
            : "warning"
        }
        mb={8}
      >
        {statusRequest}
      </Text>
      <Content padder contentContainerStyle={styles.content}>
        <Text category="h6" mv={24}>
          {t("bookingWith")}
        </Text>
        <UserField
          avatar={Images.avatar2}
          name={"Marian Ramsey"}
          location={"Rochester, NY"}
          miles={2}
        />
        <Text category="h6">{t("when")}</Text>
        <Flex itemsCenter mt={16}>
          <Text category="para-m">
            {dayjs(new Date()).format("ddd, MM DD")}
          </Text>
          {statusRequest === "Accepted" ? (
            <Flex justify="flex-start" itemsCenter onPress={onAddToCalendar}>
              <Icon
                pack="assets"
                name="calendarRequest"
                style={styles.iconCalendar}
              />
              <Text status={"link"} category="h8">
                {t("addToCalendar")}
              </Text>
            </Flex>
          ) : null}
        </Flex>
        <Text category="para-m" mt={8}>
          08:00 - 12:00
        </Text>
        <Flex itemsCenter mb={40}>
          <Layout style={styles.tag}>
            <Text category="h9" status={"primary"} mh={20} mv={8}>
              {t("common:regularly")}
            </Text>
          </Layout>
          <Weekdays data={DATA} size="large" status="primary" />
        </Flex>
        <Text category="h6">{t("where")}</Text>
        <Text category="para-m" mt={16} mb={8}>
          Rochester, NY
        </Text>
        {statusRequest === "Unconfirmed" ? (
          <Text category="h8-s" mb={28}>
            We will provide Christine’s phone number when you is accepted
          </Text>
        ) : (
          <Text category="h7" status={"link"} mb={16}>
            022-256-6053
          </Text>
        )}
        <Image
          source={Images.map}
          style={{
            width: width,
            marginLeft: -24,
          }}
        />
        <View style={styles.details}>
          <Text category="h6">{t("common:details")}</Text>
          <Text category="para-m" mt={16} mb={8}>
            2 Children - Infrant, Toddler - Dogs
          </Text>
          <Text category="para-m" mb={8}>
            Hourly rate: $15/hr
          </Text>
          <Text category="para-m">Payment method: Credit Card</Text>
        </View>
        <View style={styles.additional}>
          <Text category="h6">{t("additional")}</Text>
          <Text category="para-m" mt={16}>
            I’m looking for someone to watch our baby boy 2-3 times per month.
            Must have experience working with babies.
          </Text>
        </View>
        {statusRequest === "Unconfirmed" ? (
          <Text category="h8-s" status={"placeholder"} mb={20}>
            You have 19 hours left to response
          </Text>
        ) : null}
        {statusRequest == Request_Status_Type_Enum.Accepted ? (
          <Button
            children={t("cancelBooking").toString()}
            size="small"
            appearance="outline"
            style={styles.cancelInterview}
          />
        ) : null}
      </Content>
      {statusRequest == Request_Status_Type_Enum.Accepted ? (
        <Layout
          style={[styles.fitBottom, { paddingBottom: bottom + 8 }]}
          level="2"
        >
          <Button
            children={t("sendMessage").toString()}
            style={globalStyle.shadowBtn}
            onPress={onSendMessage}
          />
        </Layout>
      ) : null}
      {statusRequest === Request_Status_Type_Enum.Unconfirmed ? (
        <Flex level="2" style={styles.bottom} padder pb={bottom + 8}>
          <Button
            children={t("common:decline").toString()}
            status="outline"
            style={[globalStyle.flexOne, { marginRight: 16 }]}
            onPress={onDecline}
          />
          <Button
            children={t("common:accept").toString()}
            style={[globalStyle.flexOne]}
            onPress={onAccept}
          />
        </Flex>
      ) : statusRequest === Request_Status_Type_Enum.Completed ? (
        <Flex level="2" style={styles.bottom} padder pb={bottom + 8}>
          <Button
            children={t("common:decline").toString()}
            status="outline"
            style={globalStyle.flexOne}
            onPress={onDecline}
          />
          <Button
            children={t("common:confirmHour").toString()}
            style={[globalStyle.flexOne, { marginLeft: 16, height: 56 }]}
            onPress={onConfirmHour}
          />
        </Flex>
      ) : null}
    </Container>
  );
});

export default BookingDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 80,
  },
  iconCalendar: {
    ...globalStyle.icon16,
    tintColor: "text-placeholder-color",
    marginRight: 8,
  },
  tag: {
    backgroundColor: "color-twitter-100",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 12,
  },
  details: {
    marginVertical: 40,
  },
  cancelInterview: {
    alignSelf: "center",
    marginBottom: 40,
  },
  additional: {
    marginBottom: 40,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...globalStyle.shadowFade,
    paddingTop: 14,
    ...globalStyle.topBorder24,
  },
  fitBottom: {
    left: 24,
    right: 24,
    bottom: 0,
    position: "absolute",
  },
});
const DATA = [
  {
    title: "Sun",
    isActive: false,
  },
  {
    title: "Mon",
    isActive: false,
  },
  {
    title: "Tue",
    isActive: true,
  },
  {
    title: "Wed",
    isActive: true,
  },
  {
    title: "Thu",
    isActive: true,
  },
  {
    title: "Fri",
    isActive: false,
  },
  {
    title: "Sat",
    isActive: false,
  },
];
