import React, { memo } from "react";
import { ViewStyle, TouchableOpacity, StyleSheet } from "react-native";
import { CheckBox, Icon } from "@ui-kitten/components";
import Flex from "components/Flex";

interface ApprovalProps {
  style?: ViewStyle;
  children: string;
  checked: boolean;
  onChange?(): void;
}

const Approval = memo(
  ({ style, children, checked, onChange }: ApprovalProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.54}
        style={[styles.container, style]}
        onPress={onChange}
        disabled={checked}
      >
        <Flex>
          <CheckBox
            appearance={"success"}
            checked={checked}
            children={children}
            onChange={onChange}
          />
          <Icon pack="assets" name="arrowRight" />
        </Flex>
      </TouchableOpacity>
    );
  }
);

export default Approval;
const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
});
