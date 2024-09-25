import React, { memo } from "react";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Modal,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { AssetsSelector } from "expo-images-picker";
import { Asset, MediaType } from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import useModal from "hooks/useModal";
import PickImages from "./components/PickImages";
import { AuthStackParamList } from "navigation/types";

const UploadPhoto = memo(() => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["approvalChecklist", "common"]);
  const [listImg, setListImg] = React.useState<Array<Asset>>([]);

  const onSuccess = (data: any) => {
    setListImg(data);
  };

  const { visible, show, hide } = useModal(false);

  const widgetErrors = React.useMemo(
    () => ({
      errorTextColor: "black",
      errorMessages: {
        hasErrorWithPermissions: "Please Allow media gallery permissions.",
        hasErrorWithLoading: "There was an error while loading images.",
        hasErrorWithResizing: "There was an error while loading images.",
        hasNoAssets: "No images found.",
      },
    }),
    []
  );

  const widgetSettings = React.useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results but gives meta data and absolute path for ios users
      initialLoad: 100,
      assetsType: [MediaType.photo],
      minSelection: 1,
      maxSelection: 4,
      portraitCols: 2,
      landscapeCols: 10,
    }),
    []
  );
  const widgetNavigator = React.useMemo(
    () => ({
      Texts: {
        finish: "Done",
        back: "Back",
        selected: "Selected",
      },
      midTextColor: theme["text-basic-color"],
      minSelection: 4,
      buttonTextStyle: styles.textModal,
      buttonStyle: styles.buttonModal,
      onBack: hide,
      onSuccess: (e: any) => onSuccess(e),
    }),
    []
  );

  const widgetStyles = React.useMemo(
    () => ({
      margin: 2,
      bgColor: theme["background-basic-color-1"],
      spinnerColor: theme["button-outline-color"],
      widgetWidth: 99,
      screenStyle: { borderRadius: 8, height: "100%" },
      videoIcon: {
        Component: Ionicons,
        iconName: "ios-videocam",
        color: theme["text-placeholder-color"],
        size: 24,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: "ios-checkmark-circle-outline",
        color: theme["text-primary-color"],
        bg: theme["color-success-400"],
        size: 24,
      },
    }),
    []
  );
  const onRemove = React.useCallback((item: any) => {}, []);
  const onSave = React.useCallback(() => {
    navigate("VideoIntroduce");
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction />}
        title={t("photoGuideline").toString()}
        accessoryRight={() => (
          <Text onPress={onSave} category="h7" status={"link"}>
            {t("common:save")}
          </Text>
        )}
      />
      <Content padder contentContainerStyle={styles.content}>
        <Text category="h7" mb={24}>
          {t("photoGuidelineTitle")}
        </Text>
        <PickImages onAdd={show} listImg={listImg} onRemove={onRemove} />
        <Text category="para-s" mt={66} mb={4}>
          {t("friendlyAndInviting")}
        </Text>
        <Text category="para-s" mb={40}>
          {t("clearlyUnidentifiableAsU")}
        </Text>
        <Text category="h7" mb={8}>
          {t("rulePhotoTitle")}
        </Text>
        <Text category="para-s">- {t("rulePhoto1")}</Text>
        <Text category="para-s">- {t("rulePhoto2")}</Text>
        <Text category="para-s">- {t("rulePhoto3")}</Text>
        <Text category="para-s">- {t("rulePhoto4")}</Text>
      </Content>
      <Modal
        style={styles.modal}
        visible={visible}
        backdropStyle={styles.backdropStyle}
        onBackdropPress={hide}
      >
        <AssetsSelector
          Settings={widgetSettings}
          Errors={widgetErrors}
          Styles={widgetStyles}
          Navigator={widgetNavigator}
        />
      </Modal>
    </Container>
  );
});

export default UploadPhoto;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 32,
  },
  backdropStyle: {
    backgroundColor: "#9393AA",
    opacity: 0.8,
  },
  modal: {
    paddingHorizontal: 12,
  },
  textModal: {
    fontFamily: "Gotham-Medium",
    color: "text-primary-color",
  },
  buttonModal: {
    backgroundColor: "button-basic-color",
    borderRadius: 8,
  },
});
