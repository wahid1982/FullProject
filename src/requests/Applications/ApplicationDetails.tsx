import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Button,
} from "@ui-kitten/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Container from "components/Container";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import FocusAwareStatusBar from "components/FocusAwareStatusBar";
import { Images } from "assets/images";
import ButtonFill from "components/ButtonFill";
import { globalStyle } from "styles/globalStyle";
import Personal from "src/find/JobDetails/Personal";
import Flex from "components/Flex";
import Weekdays from "src/find/components/Weekdays";
import Description from "src/find/JobDetails/Description";
import { ApplicationDetailsScreenNavigationProp } from "navigation/types";
import { Request_Status_Type_Enum } from "constants/Types";

const ApplicationDetails = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["requests", "common"]);

  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });
  const styleCover = useAnimatedStyle(() => {
    const heightAnim = interpolate(
      translationY.value,
      [-100, 0],
      [height / 2.4 + 100, height / 2.4],
      Extrapolate.CLAMP
    );
    return {
      position: "absolute",
      left: 0,
      width: width,
      resizeMode: "cover",
      height: heightAnim,
      top: 0,
    };
  });
  const styleHeader = useAnimatedStyle(() => {
    const input = [0, height * 0.35, height * 0.4, height * 0.5];
    const scale = interpolate(translationY.value, input, [0, 0, 1, 1]);
    const transY = interpolate(
      translationY.value,
      input,
      [1, 1, 0, 0],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translationY.value,
      input,
      [0, 0, 0.8, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
      transform: [{ scale }, { translateY: transY }],
    };
  });
  const route = useRoute<ApplicationDetailsScreenNavigationProp>();

  const onCancel = () => {};
  const onSendMessage = () => {};
  return (
    <Container style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      <Animated.Image source={Images.cover} style={styleCover} />

      <TopNavigation
        appearance={"control"}
        accessoryLeft={
          <ButtonFill icon={"back"} status="transparent" onPress={goBack} />
        }
        accessoryRight={<ButtonFill icon={"option"} status="transparent" />}
        title={
          <Animated.View style={styleHeader}>
            <Text status={"primary"} center category="h6">
              Marian Ramsey
            </Text>
          </Animated.View>
        }
      />

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: 240 + top * (height / 812),
          },
        ]}
        style={[
          {
            paddingTop: 196 + top * (height / 812),
          },
        ]}
      >
        <View>
          <Avatar
            source={Images.avatar8}
            size="giant"
            shape="rounded"
            /* @ts-ignore */
            style={styles.avatar}
          />
        </View>
        <Personal
          name={"Marian Ramsey"}
          trustedFamily
          carePro
          mt={72}
          mb={32}
        />
        <Text category="h2" mb={16}>
          Regular afterschool child caregiver needed.
        </Text>
        <Text category="para-m" mb={16}>
          1 Children - John - Dogs
        </Text>
        <Flex mr={36} mb={24}>
          <View>
            <Text category="h8" status={"placeholder"} mb={8}>
              {t("common:start")}
            </Text>
            <Text category="h6">Tue, Otc 14</Text>
          </View>
          <View>
            <Text category="h8" status={"placeholder"} mb={8}>
              {t("common:hour")}
            </Text>
            <Text category="h6">08:00 - 12:00</Text>
          </View>
        </Flex>
        <Flex mb={32}>
          <View style={styles.regularly}>
            <Text category="h9" status={"primary"}>
              {t("common:regularly")}
            </Text>
          </View>
          <Weekdays data={DAY_IN_WEEK} size="large" status="primary" />
        </Flex>
        <Flex justify="flex-start" itemsCenter mb={16}>
          <Text category="para-m">Rochester, NY</Text>
          <Layout style={globalStyle.dot} level="5" />
          <Text category="para-m">2 miles</Text>
        </Flex>
        <Image
          source={Images.map}
          style={{
            width: width,
            marginLeft: -24,
            height: 200 * (height / 812),
            marginBottom: 56,
          }}
        />
        <Description
          tagQualifications={TAG_QUALIFICATIONS}
          tagResponsibilities={TAG_RESPONSIBILITIES}
        />
      </Animated.ScrollView>
      <Flex style={[styles.bottom, { paddingBottom: bottom + 8 }]} level="2">
        <View>
          <Text category="h5" mb={8}>
            $15-$20/hr
          </Text>
          <Text category="h8-s">2 Applicants</Text>
        </View>
        {route.params.type === Request_Status_Type_Enum.Unconfirmed ? (
          <Button
            children={t("cancelApplication").toString()}
            onPress={onCancel}
          />
        ) : (
          <Button
            children={t("sendMessage").toString()}
            onPress={onSendMessage}
          />
        )}
      </Flex>
    </Container>
  );
});

export default ApplicationDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    ...globalStyle.topBorder16,
    paddingHorizontal: 24,
    backgroundColor: "background-basic-color-1",
    marginTop: -16,
  },
  avatar: {
    position: "absolute",
    bottom: -48,
    zIndex: 10,
    alignSelf: "center",
  },
  regularly: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "color-primary-300",
    borderRadius: 8,
  },
  bottom: {
    padding: 16,
    paddingHorizontal: 16,
    ...globalStyle.shadowFade,
    ...globalStyle.topBorder24,
  },
});
const DAY_IN_WEEK = [
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
const TAG_QUALIFICATIONS = [
  "Has a car",
  "Comfortable with pets",
  "Will provide sick care",
  "None Smoking",
  "College educated",
  "Background Check",
];
const TAG_RESPONSIBILITIES = [
  "Driving the kids",
  "Prepares food",
  "Sleep training",
  "Potty Training",
  "Will provide sick care",
];
