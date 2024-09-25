import React from "react";
import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Layout, useTheme } from "@ui-kitten/components";

import Text from "components/Text";
import ProgressBar from "components/ProgressBar";

interface Props {
  tabs: string[];
  level?: string;
  style?: ViewStyle;
  activeIndex: number;
  onChange(index: number): void;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const BasicTabBar = ({
  style,
  activeIndex,
  onChange,
  tabs,
  onLayout,
}: Props) => {
  const theme = useTheme();
  const changeIndex = React.useCallback(
    (i: number) => {
      return onChange(i);
    },
    [activeIndex]
  );

  return (
    <ScrollView
      style={[styles.container, style]}
      horizontal
      scrollEnabled={false}
      onLayout={onLayout}
    >
      {tabs.map((item, i) => {
        const RenderProgress = React.useCallback(() => {
          return (
            <ProgressBar
              didDone={activeIndex + 1}
              total={activeIndex + 1}
              style={[styles.line]}
              minimumTrackTintColor={
                activeIndex === i ? theme["text-link-color"] : "transparent"
              }
              maximumTrackTintColor="transparent"
            />
          );
        }, [activeIndex]);
        return (
          <TouchableOpacity
            onLayout={(event) => event.nativeEvent.layout.width}
            key={i}
            style={[styles.btn]}
            onPress={() => changeIndex(i)}
            activeOpacity={0.54}
          >
            <Text
              mb={8}
              mh={12}
              category="h8"
              status={activeIndex === i ? "link" : "placeholder"}
              uppercase
            >
              {item}
            </Text>
            <Layout />
            <RenderProgress />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default BasicTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "center",
  },
  boxAni: {
    height: 2,
    position: "absolute",
    borderRadius: 20,
    bottom: 0,
  },
  btn: {
    marginRight: 8,
    borderRadius: 24,
  },
  line: {
    width: 32,
    alignSelf: "center",
    height: 2,
  },
});
