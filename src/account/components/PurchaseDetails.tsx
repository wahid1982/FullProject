import React, { memo } from "react";
import { View } from "react-native";
import Text from "components/Text";
import { useTranslation } from "react-i18next";
import Flex from "components/Flex";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

interface PurchaseDetailsProps {
  trustedCare: boolean;
  total: number;
}

const PurchaseDetails = memo(({ trustedCare, total }: PurchaseDetailsProps) => {
  const { t } = useTranslation(["confirmPayment", "auth", "common"]);
  let priceBgCheck = !trustedCare ? 20 : 45;
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.container}>
      <Text category="h6" mb={24}>
        {t("purchaseDetails")}
      </Text>
      <Flex mb={16}>
        <Text category="para-m">
          {trustedCare ? t("auth:trustedCare") : t("common:basic")}
          {t("backgroundCheck")}
        </Text>
        <Text category="para-m">${priceBgCheck}</Text>
      </Flex>
      <Flex mb={24}>
        <Text category="para-m">{t("mvrCheck")}</Text>
        <Text category="para-m">$40</Text>
      </Flex>
      <Flex mb={24}>
        <Text category="h7">{t("common:total")}</Text>
        <Text category="h7">${total}</Text>
      </Flex>
    </View>
  );
});

export default PurchaseDetails;

const themedStyles = StyleService.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "background-basic-color-3",
    marginBottom: 40,
  },
});
