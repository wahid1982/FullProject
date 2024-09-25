import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "components/Text";
import {
  CheckBox,
  Icon,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import Flex from "components/Flex";
import { useTranslation } from "react-i18next";
import { globalStyle } from "styles/globalStyle";

interface BackgroundCheckProps {
  basic: boolean;
  checked: boolean;
  title?: string;
  description?: string;
  onChange: (checked?: boolean, indeterminate?: boolean) => void;
}

const BackgroundCheck = memo(
  ({ checked, onChange, basic, title, description }: BackgroundCheckProps) => {
    const { t } = useTranslation(["auth", "common"]);
    const styles = useStyleSheet(themedStyles);
    return (
      <TouchableOpacity
        style={[styles.container, globalStyle.shadow]}
        activeOpacity={0.54}
        onPress={() => onChange()}
      >
        <CheckBox
          checked={checked}
          style={styles.checkbox}
          onChange={onChange}
        />
        <View style={styles.right}>
          <Flex itemsCenter mb={12}>
            <Flex itemsCenter>
              <Icon
                style={styles.icon}
                pack="assets"
                name={
                  title ? "vehicleCheck" : basic ? "bgCheck" : "bgCheckEnhanced"
                }
              />
              <Text category="h6" ml={16}>
                {title ? "MRV" : basic ? t("common:basic") : t("trustedCare")}
              </Text>
            </Flex>
            <Text category="h6">${basic ? 20 : 49}</Text>
          </Flex>
          <Text category="h8-s" status={"placeholder"}>
            {title ? title : t("bgCheckBadges")}
          </Text>
          <Flex justify="flex-start" mv={8}>
            <Text category="h8-s" status={"placeholder"}>
              {description ? description : t("bgCheckBadges1")}
            </Text>
            <Text category="h8-s" status={"placeholder"}>
              {basic ? "4x" : "6x"}
            </Text>
            <Text category="h8-s" status={"placeholder"}>
              {t("times")}.
            </Text>
          </Flex>
          {title ? null : (
            <Flex justify="flex-start">
              <Text category="h8-s" status={"placeholder"}>
                {t("bgCheckBadges2")}
              </Text>
              <Text category="h8-s" status={"placeholder"}>
                {basic ? "5x" : "10x"}
              </Text>
              <Text category="h8-s" status={"placeholder"}>
                {t("times")}.
              </Text>
            </Flex>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

export default BackgroundCheck;

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-2",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  checkbox: {
    marginRight: 16,
    marginTop: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
  right: {
    flex: 1,
  },
});
