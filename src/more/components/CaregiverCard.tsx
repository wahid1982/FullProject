import React from "react";
import { TouchableOpacity, View } from "react-native";

import Text from "components/Text";
import {
  useStyleSheet,
  StyleService,
  Avatar,
  Layout,
  Icon,
  useTheme,
} from "@ui-kitten/components";
import { CaregiverCardProps, Onl_State_Types_Enum } from "constants/Types";
import { globalStyle } from "styles/globalStyle";
import Flex from "components/Flex";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainBottomTabStackParamList } from "navigation/types";

interface ItemProps {
  item: CaregiverCardProps;
}

const CaregiverCard = ({ item }: ItemProps) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const { navigate } =
    useNavigation<NavigationProp<MainBottomTabStackParamList>>();
  const _onProfile = () => navigate("More", { screen: "ProfileSrc" });
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatar} activeOpacity={0.54} onPress={_onProfile}>
        <Avatar shape="rounded" size={"large"} source={item.avatar} />
        <View
          style={[
            styles.onlineIcon,
            {
              backgroundColor:
                item.onlineStatus === Onl_State_Types_Enum.Online
                  ? theme["color-success-100"]
                  : item.onlineStatus === Onl_State_Types_Enum.Offline
                  ? theme["color-basic-400"]
                  : item.onlineStatus === Onl_State_Types_Enum.LiveStream
                  ? theme["color-danger-100"]
                  : item.onlineStatus === Onl_State_Types_Enum.JustLeave
                  ? theme["color-primary-100"]
                  : theme["color-warning-100"],
            },
          ]}
        />
      </TouchableOpacity>
      <Layout level={"2"} style={styles.content}>
        <View style={styles.leftContent}>
          {item.backgroundCheck ? (
            <Icon pack="assets" name="bgCheck" style={globalStyle.icon24} />
          ) : null}
          {item.carePro ? (
            <Icon pack="assets" name="carePro" style={globalStyle.icon24} />
          ) : null}
        </View>
        <View style={styles.rightContent}>
          <Text category="h7" mb={14}>
            {item.name}
          </Text>
          <Flex itemsCenter justify="flex-start">
            <Icon pack="assets" name={item.gender} style={styles.icon} />
            <Text category="h8-s">{item.age}</Text>
            <Layout style={styles.dot} level="5" />
            <Text category="h8-s">{item.yearExp} yrs paid experience</Text>
          </Flex>
          <Flex itemsCenter justify="flex-start">
            <Icon
              pack="assets"
              name={"homeActive"}
              style={globalStyle.icon16}
            />
            <Text category="h8-s" ml={8} mv={8}>
              {item.location}
            </Text>
          </Flex>
          <Flex itemsCenter justify="flex-start" mb={8}>
            <Icon pack="assets" name={"rateFull"} style={globalStyle.icon16} />
            <Text category="h8" ml={8}>
              {item.rate.rateNumber}
            </Text>
            <Text category="h9-s" ml={8} status="placeholder">
              ({item.rate.review} reviews)
            </Text>
          </Flex>
          <Flex justify="flex-start" itemsCenter>
            <Icon pack="assets" name="hourlyRate" style={globalStyle.icon16} />
            <Text category="h8" ml={8}>
              {item.price}
            </Text>
            <Text category="h9-s" ml={8} status="placeholder">
              Cared for {item.caredFamily} families
            </Text>
          </Flex>
        </View>
      </Layout>
    </View>
  );
};

export default CaregiverCard;

const themedStyles = StyleService.create({
  container: {},
  avatar: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  content: {
    marginTop: 16,
    marginLeft: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    ...globalStyle.shadow,
  },
  rightContent: {
    marginLeft: 32,
  },
  icon: {
    ...globalStyle.icon16,
    tintColor: "button-basic-color",
    marginRight: 8,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 99,
    marginHorizontal: 8,
  },
  leftContent: {
    alignSelf: "flex-end",
    height: 60,
    justifyContent: "space-between",
  },
  onlineIcon: {
    width: 16,
    height: 16,
    position: "absolute",
    borderRadius: 99,
    borderWidth: 2,
    borderColor: "background-basic-color-2",
    bottom: 0,
    right: 0,
  },
});
