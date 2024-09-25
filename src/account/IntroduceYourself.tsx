import React, { memo } from "react";
import { View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  CheckBox,
  Icon,
  Datepicker,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Container from "components/Container";
import SignupHeader from "./components/StepTitle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Controller, useForm } from "react-hook-form";
import Flex from "components/Flex";
import NavigationAction from "components/NavigationAction";
import dayjs from "dayjs";
import { globalStyle } from "styles/globalStyle";
import { AuthStackParamList } from "navigation/types";

const IntroduceYourself = memo(() => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["auth", "common"]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "Edith Johnson",
      homeAddress: "128 Lincoln St #105, Boston, NY",
      phoneNumber: "965-954-9111",
    },
  });
  const [male, setMale] = React.useState(false);
  const [birthday, setBirthday] = React.useState(new Date());
  const onChange = React.useCallback((next) => {
    setMale(next);
  }, []);
  const onVerify = React.useCallback(() => {
    navigate("Verification");
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SignupHeader title={t("introduceYourself")} step={3} />
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("fullName").toString()}
              status={errors.fullName ? "warning" : "basic"}
              style={styles.fullName}
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.fullName?.message}
            />
          )}
        />
        <Text category="h7" mb={24}>
          {t("gender")}
        </Text>
        <Flex mb={32}>
          <CheckBox children={"Male"} checked={male} onChange={onChange} />
          <CheckBox children={"Female"} checked={!male} onChange={onChange} />
        </Flex>
        <Controller
          control={control}
          name="homeAddress"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("homeAddress").toString()}
              status={errors.homeAddress ? "warning" : "basic"}
              style={styles.homeAddress}
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.homeAddress?.message}
              accessoryRight={() => (
                <Icon pack="assets" name="map" style={styles.iconMap} />
              )}
            />
          )}
        />
        <Text category="h9" status="placeholder" mt={8} mb={24}>
          {t("homeAddressCaption")}
        </Text>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("phoneNumber").toString()}
              status={errors.phoneNumber ? "warning" : "basic"}
              style={styles.phoneNumber}
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="numeric"
              caption={errors.phoneNumber?.message}
            />
          )}
        />
        <Text category="h9" status="placeholder" mt={8} mb={18}>
          {t("phoneNumberCaption")}
        </Text>
        <Datepicker
          label={`MM/YY`}
          /* @ts-ignore */
          placeholder={null}
          style={styles.birthday}
          min={new Date(1900, 0, 0)}
          max={new Date()}
          onSelect={(nextDate) => {
            setBirthday(nextDate);
          }}
          filter={() => true}
          accessoryLeft={(props) => (
            <Flex>
              <Icon pack="assets" name="calendar" {...props} />
              <Text center category="h7" ml={12}>
                {dayjs(birthday).format("MMM DD, YYYY")}
              </Text>
            </Flex>
          )}
        />
      </KeyboardAwareScrollView>
      <View style={[styles.bottom, { bottom: 8 + bottom }]}>
        <Button
          children={t("verifyByPhone").toString()}
          style={globalStyle.shadowBtn}
          onPress={onVerify}
        />
      </View>
    </Container>
  );
});

export default IntroduceYourself;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  fullName: {
    borderBottomWidth: 2,
    marginBottom: 32,
  },
  homeAddress: {
    borderBottomWidth: 2,
  },
  iconMap: {
    tintColor: "color-primary-100",
  },
  phoneNumber: {
    borderBottomWidth: 2,
  },
  birthday: {},
  bottom: {
    paddingHorizontal: 24,
  },
});
