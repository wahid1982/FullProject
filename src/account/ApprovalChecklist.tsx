import React, { memo } from "react";
import { Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import ProgressBar from "components/ProgressBar";
import Approval from "./components/Approval";
import useToggle from "hooks/useToggle";
import { AuthStackParamList } from "navigation/types";

const ApprovalChecklist = memo(() => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["approvalChecklist", "common"]);

  const SIZE_IMG = 120 * (width / 375);
  const [moreAboutU, setMoreAboutU] = useToggle(true);
  const [rate, setRate] = useToggle(true);
  const [review, setReview] = useToggle(false);
  const [sayHello, setSayHello] = useToggle(false);

  const onReviewPhoto = React.useCallback(() => {
    navigate("UploadPhoto");
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction icon="close" />}
        title={t("approvalChecklist:title").toString()}
      />
      <Content padder contentContainerStyle={styles.content}>
        <Image
          source={Images.success}
          style={{ width: SIZE_IMG, height: SIZE_IMG, alignSelf: "center" }}
        />
        <Text category="h6" mt={32} mb={16} center>
          {t("readyStart")}
        </Text>
        <Text category="h8-s" mb={30} center>
          {t("readyStartTitle")}
        </Text>
        <ProgressBar
          didDone={5}
          total={10}
          styleBar={styles.progressBar}
          style={styles.progressBar}
        />
        <Approval
          children={"Tell families more about you"}
          checked={moreAboutU}
          onChange={setMoreAboutU}
        />
        <Approval children="Set your rates" checked={rate} onChange={setRate} />
        <Approval
          children="Review the photo guideline"
          checked={review}
          onChange={() => {
            onReviewPhoto(), setReview();
          }}
        />
        <Approval
          children='Say "Hello" in a 30 second video.'
          checked={sayHello}
          onChange={setSayHello}
        />
      </Content>
    </Container>
  );
});

export default ApprovalChecklist;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 40,
  },
  progressBar: {
    height: 4,
    width: "100%",
    marginBottom: 32,
  },
});
