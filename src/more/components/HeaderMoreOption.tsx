import React, { memo } from "react";
import { View, ImageRequireSource } from "react-native";
import { StyleService, useStyleSheet, Avatar } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import Flex from "components/Flex";
import NavigationAction from "components/NavigationAction";
import { MainBottomTabStackParamList } from "navigation/types";

interface HeaderOptionProps {
  name: string;
  avatar: ImageRequireSource;
  email: string;
  notification?: number;
}

const HeaderMoreOption = memo(
  ({ email, avatar, name, notification }: HeaderOptionProps) => {
    const { navigate } =
      useNavigation<NavigationProp<MainBottomTabStackParamList>>();
    const styles = useStyleSheet(themedStyles);
    const _onProfile = () => navigate("More", { screen: "ProfileSrc" });
    const _onNotification = () => navigate("More", { screen: "Notification" });
    return (
      <Flex itemsCenter mb={48}>
        <Flex itemsCenter justify="flex-start">
          <Flex onPress={_onProfile}>
            <Avatar
              source={avatar}
              /* @ts-ignore */
              style={styles.avatar}
              shape="rounded"
            />
          </Flex>
          <View>
            <Text category="h6">{name}</Text>
            <Text category="h8-s" status={"placeholder"} mt={4}>
              {email}
            </Text>
          </View>
        </Flex>
        <Flex onPress={_onNotification}>
          <NavigationAction
            icon="notification"
            status="facebook"
            onPress={() => null}
            disabled
          />
          <Flex style={styles.notification} itemsCenter border={24}>
            <Text category="h9" status={"primary"}>
              {notification}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }
);

export default HeaderMoreOption;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  avatar: {
    marginRight: 16,
  },
  notification: {
    position: "absolute",
    width: 14,
    height: 14,
    backgroundColor: "color-danger-100",
    justifyContent: "center",
    right: -4,
    top: -2,
  },
});
