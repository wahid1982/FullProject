import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

import Text from "components/Text";
import { useStyleSheet, StyleService, Icon } from "@ui-kitten/components";
import dayjs from "utils/dayjs";
import { Images } from "assets/images";
interface TimePickerProps {
  label: string;
  timeStart: Date | number;
  onPress(): void;
  style?: ViewStyle;
  marginLeft?: number;
  marginRight?: number;
}

const TimePicker = ({
  timeStart,
  onPress,
  style,
  marginLeft,
  marginRight,
}: TimePickerProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <TouchableOpacity
      activeOpacity={0.54}
      style={[
        styles.container,
        style,
        { marginLeft: marginLeft, marginRight: marginRight },
      ]}
      onPress={onPress}
    >
      <Icon pack="assets" name="time" />
      <Text category="h7" ml={12}>
        {dayjs(timeStart).format("hh:mm")}
      </Text>
    </TouchableOpacity>
  );
};

export default TimePicker;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "background-basic-color-3",
    flex: 1,
    paddingBottom: 8,
    alignItems: "center",
  },
});
