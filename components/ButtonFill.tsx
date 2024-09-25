import React from "react";
import {
  ImageBackground,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import {
  useStyleSheet,
  StyleService,
  Icon,
  useTheme,
} from "@ui-kitten/components";
import { Images } from "assets/images";
interface ButtonFillProps {
  icon: string;
  size?: "large" | "medium" | "small" | "tiny";
  onPress?(): void;
  style?: StyleProp<ViewStyle>;
  status?:
    | "basic"
    | "danger"
    | "placeholder"
    | "success"
    | "facebook"
    | "warning"
    | "twitter"
    | "white"
    | "neutral"
    | "twitter-3"
    | "green"
    | "transparent";
}

const ButtonFill = ({
  icon = "back",
  size = "medium",
  status = "basic",
  onPress,
  style,
}: ButtonFillProps) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const getSize = (size: "large" | "medium" | "small" | "tiny"): number => {
    switch (size) {
      case "large":
        return 56;
      case "medium":
        return 40;
      case "small":
        return 32;
      case "tiny":
        return 24;
      default:
        return 40;
    }
  };
  const getSizeIcon = (size: "large" | "medium" | "small" | "tiny"): number => {
    switch (size) {
      case "large":
        return 24;
      case "medium":
        return 24;
      case "small":
        return 24;
      case "tiny":
        return 12;
      default:
        return 24;
    }
  };
  const getColor = (
    status:
      | "danger"
      | "placeholder"
      | "success"
      | "facebook"
      | "basic"
      | "warning"
      | "twitter"
      | "green"
      | "white"
      | "transparent"
      | "twitter-3"
      | "neutral"
  ): string => {
    switch (status) {
      case "basic":
        return theme["button-basic-color"];
      case "danger":
        return theme["color-danger-100"];
      case "placeholder":
        return theme["text-placeholder-color"];
      case "success":
        return theme["color-success-100"];
      case "facebook":
        return theme["color-facebook-100"];
      case "twitter":
        return theme["color-twitter-100"];
      case "twitter-3":
        return theme["color-primary-300"];
      case "warning":
        return theme["color-warning-100"];
      case "white":
        return theme["background-basic-color-2"];
      case "transparent":
        return theme["color-basic-700"];
      case "neutral":
        return theme["color-basic-500"];
      case "green":
        return theme["color-success-200"];
      default:
        return theme["button-basic-color"];
    }
  };
  return (
    <ImageBackground
      source={Images.fillActive}
      imageStyle={{
        width: getSize(size),
        height: getSize(size),
        tintColor: getColor(status),
      }}
      style={[
        styles.container,
        {
          width: getSize(size),
          height: getSize(size),
        },
        style,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.54}
        onPress={onPress}
        style={styles.container}
      >
        <Icon
          pack="assets"
          name={icon ? icon : "back"}
          style={[
            styles.icon,
            {
              width: getSizeIcon(size),
              height: getSizeIcon(size),
              tintColor:
                status === "white"
                  ? theme["button-basic-color"]
                  : theme["text-primary-color"],
            },
          ]}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default ButtonFill;

const themedStyles = StyleService.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    tintColor: "text-primary-color",
  },
});
