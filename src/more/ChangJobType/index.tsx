import React, { memo } from "react";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { globalStyle } from "styles/globalStyle";
import { Images } from "assets/images";

const ChangeJobType = memo(() => {
  const { width } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["more", "common"]);

  const DATA = [
    { id: 0, title: t("childCare"), icon: "infant" },
    { id: 1, title: t("petCare"), icon: "petCare" },
    { id: 2, title: t("housekeeping"), icon: "housekeeping" },
    { id: 3, title: t("specialNeeds"), icon: "specialNeeds" },
    { id: 4, title: t("tutoring"), icon: "tutoring" },
    { id: 5, title: t("seniorCare"), icon: "seniorCare" },
  ];
  const [isChoose, setChoose] = React.useState(0);
  const sizeBG = 120 * (width / 375);
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <Content padder>
        <Text category="h2" mt={16} mb={48}>
          {t("changeJobType")}
        </Text>
        <View style={styles.content}>
          {DATA.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={{
                  width: sizeBG + 28,
                  marginLeft: (i + 1) % 2 === 0 ? 24 : 0,
                  marginBottom: 24,
                  alignItems: "center",
                }}
                onPress={() => {
                  setChoose(i);
                }}
                activeOpacity={0.54}
              >
                <View
                  style={[isChoose === i ? globalStyle.shadowBtn : undefined]}
                >
                  <ImageBackground
                    source={isChoose === i ? Images.fillActive : Images.fill}
                    style={{
                      width: sizeBG,
                      height: sizeBG,
                      ...globalStyle.center,
                    }}
                    imageStyle={{ width: sizeBG, height: sizeBG }}
                  >
                    <Icon
                      pack="assets"
                      name={item.icon}
                      style={{
                        width: 48,
                        height: 48,
                        tintColor:
                          isChoose === i
                            ? theme["text-primary-color"]
                            : theme["text-placeholder-color"],
                        zIndex: 10,
                        alignSelf: "center",
                      }}
                    />
                  </ImageBackground>
                </View>
                <Text
                  center
                  category="h8"
                  mt={16}
                  status={isChoose === i ? "link" : "placeholder"}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Content>
    </Container>
  );
});

export default ChangeJobType;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
