import React from "react";
import { View, ImageRequireSource } from "react-native";
import { Images } from "assets/images";
import Text from "components/Text";
import {
  useStyleSheet,
  StyleService,
  Avatar,
  Layout,
} from "@ui-kitten/components";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";
interface UserFieldProps {
  avatar: ImageRequireSource;
  name: string;
  location: string;
  miles: number;
}

const UserField = ({ avatar, name, miles, location }: UserFieldProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <Flex style={styles.personal} level="2" justify="flex-start" itemsCenter>
      <Avatar shape="rounded" source={Images.avatar11} size="medium" />
      <View>
        <Text category="h7" status={"basic"} ml={10}>
          {name}
        </Text>
        <Flex ml={16} mt={8}>
          <Text category="h8-s">{location}</Text>
          
        </Flex>
      </View>
    </Flex>
  );
};

export default UserField;

const themedStyles = StyleService.create({
  personal: {
    padding: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    ...globalStyle.shadow,
    marginBottom: 40,
  },
  dot: {
    width: 2,
    height: 2,
    marginHorizontal: 8,
    alignSelf: "center",
  },
});
