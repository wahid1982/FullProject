import React, { memo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Text from "components/Text";
import { Images } from "assets/images";
import useLayout from "hooks/useLayout";
import { Icon, useTheme } from "@ui-kitten/components";
import useToggle from "hooks/useToggle";
import { globalStyle } from "styles/globalStyle";

interface AgeExpItemProps {
  icon: string;
  title: string;
  des: string;
}
interface ItemProps {
  item: AgeExpItemProps;
}

const AgeExpItem = memo(({ item }: ItemProps) => {
  const [isChoose, setIsChoose] = useToggle(false);
  const { width } = useLayout();
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={{
        width: 98 * (width / 375),
        marginRight: 10,
        marginBottom: 24,
      }}
      onPress={setIsChoose}
      activeOpacity={0.54}
    >
      <View style={[isChoose ? globalStyle.shadowBtn : undefined, styles.img]}>
        <ImageBackground
          source={isChoose ? Images.fillActive : Images.fill}
          style={{ alignSelf: "center" }}
          imageStyle={{ width: 80, height: 80 }}
        >
          <Icon
            pack="assets"
            name={item.icon}
            style={{
              width: 40,
              height: 40,
              tintColor: isChoose
                ? theme["text-primary-color"]
                : theme["text-placeholder-color"],
              zIndex: 10,
              margin: 20,
            }}
          />
        </ImageBackground>
      </View>
      <Text
        center
        category="h8"
        mt={12}
        mb={8}
        status={!isChoose ? "basic" : "link"}
      >
        {item.title}
      </Text>
      <Text center category="h9" status={"placeholder"}>
        {item.des}
      </Text>
    </TouchableOpacity>
  );
});

export default AgeExpItem;

const styles = StyleSheet.create({
  container: {},
  img: {},
});
