import React, { memo } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Text from "components/Text";
import { useTranslation } from "react-i18next";

interface SignupHeaderProps {
  title: string;
  step: number;
  description?: string;
  style?: ViewStyle;
}

const SignupHeader = memo(
  ({ title, description, step, style }: SignupHeaderProps) => {
    const { t } = useTranslation(["auth", "common"]);
    return (
      <View style={[styles.container, style]}>
        <Text mb={8} category="para-m">
          {t("common:step")} {step} {t("common:of")} 4
        </Text>
        <Text category="h2" mb={8}>
          {title}
        </Text>
        {description ? <Text category="para-m">{description}</Text> : null}
      </View>
    );
  }
);

export default SignupHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: 48,
    marginTop: 16,
  },
});
