import React from "react";
import { View, ViewStyle, TouchableOpacity } from "react-native";

import Text from "components/Text";
import {
  useStyleSheet,
  StyleService,
  Layout,
  Avatar,
  useTheme,
} from "@ui-kitten/components";
import { AbilityProps, Onl_State_Types_Enum } from "constants/Types";
import { globalStyle } from "styles/globalStyle";
import ButtonFill from "components/ButtonFill";
import dayjs from "dayjs";
import useLayout from "hooks/useLayout";

interface AbilityItemProps {
  item: AbilityProps;
  style?: ViewStyle;
  onPress?(): void;
  light?: boolean;
  onPressAdd?(): void;
}

const AbilityItem = ({
  item,
  style,
  light,
  onPressAdd,
  onPress,
}: AbilityItemProps) => {
  const styles = useStyleSheet(themedStyles);
  const { width } = useLayout();
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View>
        <Text mt={32} category="h9-s" status={"basic"}>
          {dayjs(item.date).format("ddd").toUpperCase()}
        </Text>
        <Text category="h5">{dayjs(item.date).format("D").toUpperCase()}</Text>
      </View>
      <View style={{ width: 272 * (width / 375) }}>
        <Text category="h9-s" status="placeholder" mb={16}>
          {item.title?.toUpperCase()}
        </Text>
        {item.type ? (
          <TouchableOpacity activeOpacity={0.54} onPress={onPress}>
            <Layout level={"2"} style={styles.content}>
              <View>
                <Text category="h8" status={"warning"}>
                  {item.type}
                </Text>
                <Text category="h7" mv={8}>
                  {item.user?.name}
                </Text>
                <Text category="h8-s">{item.meeting_time}</Text>
              </View>
              <Avatar
                source={item.user?.avatar}
                size="medium"
                shape="rounded"
              />
              {item.user?.onlineState === Onl_State_Types_Enum.Online ? (
                <ButtonFill
                  icon="callSmall"
                  status="basic"
                  size="tiny"
                  style={styles.onlState}
                />
              ) : (
                <ButtonFill
                  icon="messageSmall"
                  status="success"
                  size="tiny"
                  style={styles.onlState}
                />
              )}
            </Layout>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPressAdd} activeOpacity={0.54}>
            <Layout
              level={"6"}
              style={[
                styles.noDataContent,
                {
                  backgroundColor: light
                    ? theme["color-success-300"]
                    : theme["background-basic-color-3"],
                  shadowColor: light ? "rgba(29, 30, 44, 0.61)" : undefined,
                },
              ]}
            >
              <Text
                category="h7"
                status={light ? "completed" : "placeholder"}
                mb={4}
              >
                No availability add
              </Text>
              <Text
                category="h8-s"
                status={light ? "completed" : "placeholder"}
              >
                Use + button to add
              </Text>
            </Layout>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AbilityItem;

const themedStyles = StyleService.create({
  container: {
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {},
  content: {
    borderRadius: 16,
    padding: 16,
    ...globalStyle.shadow,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noDataContent: {
    borderRadius: 16,
    padding: 16,
    ...globalStyle.shadow,
  },
  onlState: {
    position: "absolute",
    bottom: 16,
    right: 8,
  },
});
