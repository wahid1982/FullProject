import React, { memo } from "react";
import {
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import Text from "components/Text";
import Flex from "components/Flex";
import { Asset } from "expo-media-library";
import useLayout from "hooks/useLayout";
import { Images } from "assets/images";
import { Icon } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

interface PickImagesProps {
  listImg: Array<Asset>;
  onAdd?(): void;
  onRemove(item: Asset): void;
}

const PickImages = memo(({ listImg, onAdd, onRemove }: PickImagesProps) => {
  const { width, height } = useLayout();
  const WIDTH_IMG = 155 * (width / 375);
  const HEIGHT_IMG = 135 * (height / 812);
  const { t } = useTranslation(["approvalChecklist", "common"]);
  return (
    <Flex wrap>
      {listImg !== undefined
        ? listImg.map((item, i) => {
            return (
              <View key={i}>
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width: WIDTH_IMG,
                    height: HEIGHT_IMG,
                    borderRadius: 16,
                    marginBottom: 16,
                    zIndex: -10,
                  }}
                />
                <TouchableOpacity
                  style={styles.remove}
                  onPress={() => onRemove(item)}
                >
                  <Icon pack="assets" name="resetSearch" style={styles.icon} />
                </TouchableOpacity>
              </View>
            );
          })
        : null}
      {listImg?.length == undefined || listImg.length < 4 ? (
        <TouchableOpacity activeOpacity={0.54} onPress={onAdd}>
          <ImageBackground
            source={Images.emptyImg}
            style={{
              width: WIDTH_IMG,
              height: HEIGHT_IMG,
              borderRadius: 16,
              marginBottom: 16,
              marginRight: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon pack="assets" name="plusImg" />
            <Text category="h8" status={"link"}>
              {t("upload")}
            </Text>
            <Text category="h9" status={"placeholder"}>
              {t("max4photos")}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      ) : null}
      {listImg?.length <= 2 ? (
        <Image
          source={Images.emptyImg}
          style={{
            width: WIDTH_IMG,
            height: HEIGHT_IMG,
          }}
        />
      ) : null}
      {listImg?.length <= 1 ? (
        <Image
          source={Images.emptyImg}
          style={{
            width: WIDTH_IMG,
            height: HEIGHT_IMG,
          }}
        />
      ) : null}
      {listImg?.length <= 0 ? (
        <Image
          source={Images.emptyImg}
          style={{
            width: WIDTH_IMG,
            height: HEIGHT_IMG,
          }}
        />
      ) : null}
    </Flex>
  );
});

export default PickImages;
const styles = StyleSheet.create({
  container: {},
  remove: {
    position: "absolute",
    top: 9.5,
    right: 9.5,
    zIndex: 10,
  },
  icon: {
    width: 21,
    height: 21,
  },
});
