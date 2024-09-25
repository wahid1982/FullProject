import React, { memo } from "react";
import { View, Image, TouchableOpacity, ImageBackground } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Avatar,
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
import Container from "components/Container";
import {
  JobDetailsScreenNavigationProp,
  RootStackParamList,
} from "navigation/types";
import { Images } from "assets/images";
import FocusAwareStatusBar from "components/FocusAwareStatusBar";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Personal from "./Personal";
import Weekdays from "../components/Weekdays";
import Description from "./Description";

const JobDetails = memo(() => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["find", "common"]);
  const route = useRoute<JobDetailsScreenNavigationProp>();

  let NAME = route.params.name;
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });
  const styleCover = useAnimatedStyle(() => {
    const heightAnim = interpolate(
      translationY.value,
      [height / 2, 0],
      [0, height / 2.4 + 120],
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
    const input = [0, height * 0.3, height * 0.5, height * 0.6];
    const scale = interpolate(translationY.value, input, [0, 0, 1, 1]);
    const transY = interpolate(
      translationY.value,
      input,
      [1, 0, 0, 0],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translationY.value,
      input,
      [0, 0, 0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
      transform: [{ scale }, { translateY: transY }],
    };
  });

  const _onOption = React.useCallback(() => {}, []);
  const _onApply = React.useCallback(() => {
    navigate("MainBottomTab");
  }, []);

  return (
    <Container style={styles.container} useSafeArea={false} level="2">
      <FocusAwareStatusBar barStyle="light-content" />
      <Animated.Image source={Images.cover} style={styleCover} />
      <Flex style={styles.topNav} mh={24} mt={top + 8}>
        <TouchableOpacity activeOpacity={0.54} onPress={goBack}>
          <ImageBackground
            source={Images.fill}
            imageStyle={{ tintColor: theme["color-basic-700"] }}
            style={styles.goBack}
          >
            <Icon
              pack="assets"
              name="back"
              style={{ tintColor: theme["text-primary-color"] }}
            />
          </ImageBackground>
        </TouchableOpacity>
        <Animated.View style={styleHeader}>
          <Text status={"basic"} center category="h6" mt={4}>
            {NAME}
          </Text>
        </Animated.View>
        <TouchableOpacity activeOpacity={0.54} onPress={_onOption}>
          <ImageBackground
            source={Images.fill}
            imageStyle={{ tintColor: theme["color-basic-700"] }}
            style={styles.goBack}
          >
            <Icon
              pack="assets"
              name="option"
              style={{ tintColor: theme["text-primary-color"] }}
            />
          </ImageBackground>
        </TouchableOpacity>
      </Flex>
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
        <Avatar
          source={{ uri: "https://portal.bizcloud.qa/Files/Logo/test-2150297.png" }}
          size="giant"
          shape="rounded"
          /* @ts-ignore */
          style={styles.avatar}
        />
        <Personal name={NAME} trustedFamily carePro mt={72} mb={32} />
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
       
        <Description
          tagQualifications={TAG_QUALIFICATIONS}
          tagResponsibilities={TAG_RESPONSIBILITIES}
        />
      </Animated.ScrollView>
      <Layout
        level={"2"}
        style={[styles.bottom, { paddingBottom: bottom + 8 }]}
      >
       
        
      </Layout>
    </Container>
  );
});

export default JobDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  bottom: {
    ...globalStyle.topBorder16,
    paddingTop: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    ...globalStyle.shadow,
  },
  apply: {
    paddingHorizontal: 52,
  },
  topNav: {
    paddingBottom: 8,
  },
  goBack: {
    ...globalStyle.icon40,
    ...globalStyle.center,
  },
  content: {
    ...globalStyle.topBorder16,
    paddingHorizontal: 24,
    backgroundColor: "background-basic-color-1",
    marginTop: -16,
  },
  avatar: {
    alignSelf: "center",
  },
  regularly: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "color-primary-300",
    borderRadius: 8,
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
