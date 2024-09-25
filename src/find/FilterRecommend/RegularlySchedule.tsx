import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "components/Text";
import { CheckBox } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

interface RegularlyScheduleProps {
  checked: boolean;
  onChange?(): void;
  title: string;
  des?: string;
}

const RegularlySchedule = memo(
  ({ checked, onChange, title, des }: RegularlyScheduleProps) => {
    const { width } = useLayout();
    return (
      <TouchableOpacity
        activeOpacity={0.54}
        onPress={onChange}
        style={styles.container}
      >
        <View>
          <Text category="para-m">{title}</Text>
          {des ? (
            <Text
              category="h9-s"
              status={"placeholder"}
              maxWidth={287 * (width / 375)}
            >
              {des}
            </Text>
          ) : null}
        </View>
        <CheckBox
          checked={checked}
          onChange={onChange}
          appearance="success"
          status={"info"}
          style={styles.checked}
        />
      </TouchableOpacity>
    );
  }
);

export default RegularlySchedule;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    alignItems: "center",
  },
  checked: {
    marginLeft: 16,
  },
});
