import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Datepicker,
  Toggle,
  Layout,
  Button,
} from "@ui-kitten/components";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import {
  PurchaseBgConfirmNavigationProp,
  RootStackParamList,
} from "navigation/types";
import PurchaseDetails from "./components/PurchaseDetails";
import { Controller, useForm } from "react-hook-form";
import Flex from "components/Flex";
import dayjs from "dayjs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { globalStyle } from "styles/globalStyle";

const PurchaseBgConfirm = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["confirmPayment", "common"]);

  const route = useRoute<PurchaseBgConfirmNavigationProp>();
  let trustedCare = route.params.trustedCare;
  let totalPrice = route.params.priceBgCheck + route.params.mvrCheck;
  const [validDate, setValidDate] = React.useState(new Date());
  const [checked, setChecked] = React.useState(false);
  const onCheckedChange = React.useCallback((isChecked) => {
    setChecked(isChecked);
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardNumber: "4501 5682 4768 5698",
      name: "Hieu le quang",
      cvv: "1234",
      zipCode: "",
    },
  });
  const onNext = React.useCallback(() => {
    navigate("SuccessScr", {
      successScr: {
        title: t("paymentSuccessful"),
        description: t("paymentSuccessfulTitle"),
        children: [
          {
            title: t("paymentSuccessfulButton"),
            onPress: () =>
              navigate("AuthStack", { screen: "IntroduceYourself" }),
            status: "basic",
          },
        ],
        buttonsViewStyle: { alignSelf: "center" },
      },
    });
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text category="h2" mt={16} mb={40}>
          {t("title")}
        </Text>
        <PurchaseDetails trustedCare={trustedCare} total={totalPrice} />
        <Text category="h6" mb={24}>
          {t("auth:cardDetails")}
        </Text>
        <Controller
          control={control}
          name="cardNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("cardNumber").toString()}
              status={errors.cardNumber ? "warning" : "basic"}
              style={styles.cardNumber}
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="numeric"
              caption={errors.cardNumber?.message}
              accessoryRight={() => <Icon pack="assets" name="master" />}
            />
          )}
        />
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("nameOnCard").toString()}
              status={errors.name ? "warning" : "basic"}
              style={styles.name}
              value={value.toUpperCase()}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.name?.message}
            />
          )}
        />
        <Flex>
          <Datepicker
            label={`MM/YY`}
            /* @ts-ignore */
            placeholder={null}
            style={styles.validDate}
            min={new Date()}
            max={new Date(2050, 0, 0)}
            onSelect={(nextDate) => {
              setValidDate(nextDate);
            }}
            filter={() => true}
            accessoryLeft={(props) => (
              <Flex>
                <Icon pack="assets" name="calendar" style={styles.icon} />
                <Text center category="h7">
                  {dayjs(validDate).format("MM/YY")}
                </Text>
              </Flex>
            )}
          />
          <Controller
            control={control}
            name="cvv"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={"CVV"}
                status={errors.cvv ? "warning" : "basic"}
                style={styles.cvv}
                value={value}
                onChangeText={onChange}
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                onBlur={onBlur}
                keyboardType="numeric"
                caption={errors.cvv?.message}
                secureTextEntry
                accessoryLeft={(props) => (
                  <Icon pack="assets" name="option" style={styles.icon} />
                )}
              />
            )}
          />
        </Flex>
        <Controller
          control={control}
          name="zipCode"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("zipCode").toString()}
              status={errors.zipCode ? "warning" : "basic"}
              style={styles.zipCode}
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="numeric"
              caption={errors.zipCode?.message}
            />
          )}
        />
        <Flex itemsCenter>
          <Text>{t("saveCardInformation")}</Text>
          <Toggle checked={checked} onChange={onCheckedChange} />
        </Flex>
      </KeyboardAwareScrollView>
      <Layout style={[styles.bottom, { paddingBottom: bottom + 8 }]} level="2">
        <Button
          children={t("common:next").toString()}
          style={globalStyle.shadowBtn}
          onPress={onNext}
        />
      </Layout>
    </Container>
  );
});

export default PurchaseBgConfirm;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  cardNumber: {
    borderBottomWidth: 2,
    marginBottom: 24,
  },
  name: {
    borderBottomWidth: 2,
    marginBottom: 24,
  },
  cvv: {
    borderBottomWidth: 2,
    flex: 1,
  },
  validDate: {
    marginRight: 32,
    flex: 1,
  },
  zipCode: {
    borderBottomWidth: 2,
    marginTop: 24,
    marginBottom: 32,
  },
  icon: {
    marginRight: 12,
    tintColor: "text-placeholder-color",
  },
  bottom: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
});
