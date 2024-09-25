import React, { memo } from "react";
import { View, Animated } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { RootStackParamList } from "navigation/types";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { globalStyle } from "styles/globalStyle";
import Flex from "components/Flex";

const PaymentMethod = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["more", "common"]);

  const AnimatedView = Animated.createAnimatedComponent(View);
  const refSwipeable = React.useRef<Swipeable>(null);

  const onAdd = () => navigate("AddMorePayment");

  const widthAction = 75 * (width / 375);
  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ) => {
    const scaleDelete = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    const scaleEdit = dragX.interpolate({
      inputRange: [-110, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <>
        <RectButton style={[{ width: widthAction }]} onPress={() => {}}>
          <AnimatedView
            style={[
              { transform: [{ scale: scaleDelete }] },
              styles.deleteAction,
            ]}
          >
            <Text category="h6" status={"primary"}>
              {t("common:delete")}
            </Text>
          </AnimatedView>
        </RectButton>
        <RectButton
          style={[{ width: widthAction }]}
          onPress={() => {}}
          activeOpacity={0.54}
        >
          <AnimatedView
            style={[{ transform: [{ scale: scaleEdit }] }, styles.editAction]}
          >
            <Text category="h6" status={"primary"}>
              {t("common:edit")}
            </Text>
          </AnimatedView>
        </RectButton>
      </>
    );
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("paymentMethod").toString()}
        accessoryLeft={<NavigationAction />}
        accessoryRight={
          <NavigationAction icon="plusImg" size="small" onPress={onAdd} />
        }
      />
      <Content style={styles.content}>
        {DATA_PAYMENT.map((item, i) => {
          return (
            <View key={i} style={styles.item}>
              <Swipeable
                key={i}
                ref={refSwipeable}
                friction={2}
                enableTrackpadTwoFingerGesture
                rightThreshold={50}
                renderRightActions={renderRightActions}
              >
                <Flex
                  level="2"
                  pv={24}
                  ml={24}
                  justify="flex-start"
                  border={12}
                >
                  <Icon
                    pack="assets"
                    name="master"
                    style={styles.iconLogoBank}
                  />
                  <View>
                    <Text category="h6">{item.nameCard}</Text>
                    <Text category="h8" mt={8} status="placeholder">
                      xxxx - xxxx - xxxx - {item.last4number}
                    </Text>
                  </View>
                </Flex>
              </Swipeable>
            </View>
          );
        })}
      </Content>
    </Container>
  );
});

export default PaymentMethod;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  deleteAction: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: "text-danger-color",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  editAction: {
    backgroundColor: "text-warning-color",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    ...globalStyle.shadow,
    marginBottom: 24,
    borderRadius: 12,
    marginRight: 24,
  },
  iconLogoBank: {
    width: 48,
    height: 48,
    alignSelf: "center",
    marginHorizontal: 16,
  },
  content: {
    paddingTop: 32,
  },
});
const DATA_PAYMENT = [
  {
    id: 0,
    nameCard: "Master Card",
    last4number: 5689,
  },
  {
    id: 1,
    nameCard: "Master Card",
    last4number: 6497,
  },
  {
    id: 2,
    nameCard: "Master Card",
    last4number: 2344,
  },
  {
    id: 3,
    nameCard: "American Express",
    last4number: 1989,
  },
];
