import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
  Layout,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import SignupHeader from "./components/StepTitle";
import Flex from "components/Flex";
import BackgroundCheck from "./components/BackgroundCheck";
import useToggle from "hooks/useToggle";
import { globalStyle } from "styles/globalStyle";
import { AuthStackParamList } from "navigation/types";

const PurchaseBg = memo(() => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["auth", "common"]);

  const [trustedCare, setTrustedCare] = useToggle(false);
  const [motorCheckBag, setMotorCheckBag] = useToggle(true);

  const onPurchase = React.useCallback(
    () =>
      navigate("PurchaseBgConfirm", {
        trustedCare: trustedCare,
        priceBgCheck: trustedCare ? 49 : 20,
        mvrCheck: 45,
      }),
    [trustedCare]
  );

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        accessoryRight={
          <TouchableOpacity>
            <Text category="h7" status={"link"}>
              {t("skipThisStep")}
            </Text>
          </TouchableOpacity>
        }
      />
      <Content padder contentContainerStyle={styles.content}>
        <SignupHeader
          title={t("purchaseBg")}
          description={t("purchaseBgTitle")}
          step={2}
        />
        <Text category="h6" mb={16}>
          {t("bgChecks")}
        </Text>
        <Flex justify="flex-start" mb={24}>
          <Text category="para-m" status="link">
            {t("whatsIncluded")}
          </Text>
          <Text category="para-m">{t("inEachBackgroundCheck")}</Text>
        </Flex>
        <BackgroundCheck
          basic={true}
          checked={!trustedCare}
          onChange={setTrustedCare}
        />
        <BackgroundCheck
          basic={false}
          checked={trustedCare}
          onChange={setTrustedCare}
        />
        <Text category="h6" mb={16}>
          {t("motorVehicleRecordsCheck")}
        </Text>
        <Text category="para-m" status={"link"} mb={16}>
          {t("whatsIncluded")}
          <Text category="para-m">{t("inEach")}</Text>
          <Text category="para-m"> {t("motorVehicleRecordsCheck")}</Text>
        </Text>
        <BackgroundCheck
          checked={motorCheckBag}
          onChange={setMotorCheckBag}
          title={t("motorCheckBadges")}
          description={t("motorCheckBadges2")}
          basic
        />
      </Content>
      <Layout
        style={[styles.bottom, { paddingBottom: bottom + 8, paddingTop: 8 }]}
        level="2"
      >
        <Button
          children={t("purchaseNow").toString()}
          style={globalStyle.shadowBtn}
          onPress={onPurchase}
          disabled={!motorCheckBag}
        />
      </Layout>
    </Container>
  );
});

export default PurchaseBg;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  bottom: {
    paddingHorizontal: 24,
    ...globalStyle.shadow,
  },
  content: {
    paddingBottom: 40,
  },
});
