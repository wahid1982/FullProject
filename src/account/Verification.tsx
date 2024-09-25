import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import SignupHeader from "./components/StepTitle";
import InputCodeOtp from "./components/InputCodeOtp";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";
import { RootStackParamList } from "navigation/types";

const Verification = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["auth", "approvalChecklist", "common"]);

  const [code, setCode] = React.useState("");
  const handleVerify = React.useCallback(() => {
    navigate("SuccessScr", {
      successScr: {
        title: t("welcomeToCaren"),
        logo: true,
        description: t("welcomeTitle"),
        children: [
          {
            title: t("findJobs"),
            onPress: () => navigate("MainBottomTab"),
            status: "outline",
          },
          {
            title: t("approvalChecklist:title"),
            onPress: () =>
              navigate("AuthStack", { screen: "ApprovalChecklist" }),
            status: "basic",
          },
        ],
        buttonsViewStyle: { marginHorizontal: 68 },
      },
    });
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <Content padder>
        <SignupHeader
          title={t("verification")}
          description={t("verificationTitle")}
          step={4}
        />
        <InputCodeOtp
          autoFocus
          style={styles.enterCode}
          {...{ code, setCode }}
        />
        <Flex center>
          <Text category="h8-s">{t("didntGetCode")}</Text>
          <Text category="h8-s" status={"link"}>
            {t("sendAgain")}
          </Text>
        </Flex>
        <Button
          children={t("verify").toString()}
          style={styles.button}
          onPress={handleVerify}
        />
      </Content>
    </Container>
  );
});

export default Verification;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  enterCode: {
    marginBottom: 24,
  },
  button: {
    marginTop: 38,
    ...globalStyle.shadowBtn,
  },
});
