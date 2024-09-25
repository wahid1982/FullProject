import React, { memo } from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import NavigationAction from "components/NavigationAction";
import { globalStyle } from "styles/globalStyle";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { RootStackParamList } from "navigation/types";
const VideoIntroduce = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["approvalChecklist", "common"]);

  const [video, setVideo] = React.useState<string | null>(null);
  const pickVideo = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setVideo(result.uri);
    }
  };
  const videoPlayer = React.useRef<Video>(null);
  const onDeleteVideo = React.useCallback(() => {
    setVideo(null);
  }, []);
  const onSave = React.useCallback(() => {
    navigate("MainBottomTab");
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("videoIntroduce").toString()}
        accessoryLeft={<NavigationAction />}
        accessoryRight={
          <TouchableOpacity
            activeOpacity={0.54}
            onPress={onSave}
            disabled={video !== null}
          >
            <Text category="h7" status={"link"}>
              {t("common:save")}
            </Text>
          </TouchableOpacity>
        }
      />
      <Content>
        {video === null ? (
          <ImageBackground
            source={Images.videoFrame}
            style={{
              width: width,
              height: 320 * (height / 812),
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.54}
              onPress={pickVideo}
              style={globalStyle.center}
            >
              <Icon pack="assets" name="plusImg" style={globalStyle.icon20} />
              <Text category="h8" status={"link"} mt={8} mb={4}>
                {t("uploadVideo")}
              </Text>
              <Text
                status={"placeholder"}
                category="h9"
                maxWidth={width / 2.5}
                center
              >
                {t("uploadVideoTitle")}
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        ) : (
          <View style={globalStyle.center}>
            <Video
              source={{ uri: video }}
              resizeMode="stretch"
              style={{
                width: width,
                height: 320 * (height / 812),
                marginBottom: 24,
              }}
              focusable={false}
              useNativeControls={false}
              ref={videoPlayer}
              shouldPlay={true}
            />
            <Button
              children={t("deleteVideo").toString()}
              appearance="outline"
              size={"small"}
              onPress={onDeleteVideo}
            />
          </View>
        )}
        <View style={styles.bottom}>
          <Text category="h6" mt={40} mb={24}>
            {t("videoGuidelines")}
          </Text>
          <Text category="h7" mb={8}>
            {t("common:do")}
          </Text>
          <Text category="para-s" mb={4}>
            {t("doTitle1")}
          </Text>
          <Text category="para-s" mb={4}>
            {t("doTitle2")}
          </Text>
          <Text category="para-s" mb={4}>
            {t("doTitle3")}
          </Text>
          <Text category="h7" mt={40} mb={8}>
            {t("common:dont")}
          </Text>
          <Text category="para-s">{t("dontTitle")}</Text>
        </View>
      </Content>
    </Container>
  );
});

export default VideoIntroduce;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  bottom: {
    paddingHorizontal: 24,
  },
});
