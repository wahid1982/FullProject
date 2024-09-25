import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Toggle,
  Icon,
  Input,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Flex from "components/Flex";
import Weekdays from "src/find/components/Weekdays";
import dayjs from "dayjs";
import { globalStyle } from "styles/globalStyle";
import { Controller, useForm } from "react-hook-form";
import { RootStackParamList } from "navigation/types";

const ConfirmHour = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["requests", "successScr", "common"]);

  const [completed, setCompleted] = React.useState(true);
  const [bankDeposit, setBankDeposit] = React.useState(false);
  const [disableMinus, setDisableMinus] = React.useState(false);
  const [durationPerDay, setDuration] = React.useState<number>(1);
  const [inputLength, setInputLength] = React.useState<number>(0);

  const onMinus = React.useCallback(() => {
    setDuration(durationPerDay - 1);
  }, [durationPerDay]);
  const onPlus = React.useCallback(() => {
    setDuration(durationPerDay + 1);
  }, [durationPerDay]);

  React.useEffect(() => {
    if (durationPerDay <= 1) {
      setDisableMinus(true);
    } else {
      setDisableMinus(false);
    }
  }, [durationPerDay]);

  const onCompletedChange = React.useCallback(() => {
    setCompleted(!completed);
  }, [completed]);
  const onBankDepositChange = React.useCallback(() => {
    setBankDeposit(!bankDeposit);
  }, [bankDeposit]);

  const InputLengthField = React.useCallback(() => {
    return (
      <Text
        category="h8-s"
        status={"placeholder"}
        right
        mt={8}
      >{`${inputLength}/500`}</Text>
    );
  }, [inputLength]);

  const onConfirmed = React.useCallback(() => {
    navigate("SuccessScr", {
      successScr: {
        title: t("successScr:successful"),
        description: t("successScr:confirmHourTitle"),
        children: [
          {
            title: t("common:ok"),
            onPress: () => navigate("MainBottomTab"),
            status: "basic",
          },
        ],
        buttonsViewStyle: { marginHorizontal: 88 },
      },
    });
  }, []);
  const {
    control,
    handleSubmit,
    getValues,
    formState: {},
  } = useForm({
    defaultValues: {
      messages: "",
    },
  });
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("confirmHour").toString()}
        accessoryLeft={<NavigationAction />}
      />
      <Content padder contentContainerStyle={styles.content}>
        <View style={styles.top}>
          <Flex mb={24} onPress={onCompletedChange}>
            <Text category="para-m">{t("iCompleteJob")}</Text>
            <Toggle checked={completed} onChange={onCompletedChange} />
          </Flex>
          <Flex mb={24} onPress={onBankDepositChange}>
            <Text maxWidth={255} category="para-m">
              {t("expertingBankDeposit")}
            </Text>
            <Toggle checked={bankDeposit} onChange={onBankDepositChange} />
          </Flex>
        </View>
        <Weekdays data={DATA} size="giant" />
        <View style={styles.centerField}>
          <Flex mt={32}>
            <Text category="h7" mb={32}>
              {t("startDate")}
            </Text>
            <Text category="para-m" status={"link"}>
              {dayjs(new Date()).format("ddd, MMM DD")}
            </Text>
          </Flex>
          <Flex>
            <Text category="h7">{t("startTime")}</Text>
            <Text category="para-m" status={"link"}>
              08:00
            </Text>
          </Flex>

          <Flex itemsCenter mt={24}>
            <Text category="h7">{t("durationPerDay")}</Text>
            <Flex ml={16}>
              <TouchableOpacity
                activeOpacity={0.54}
                disabled={disableMinus}
                onPress={onMinus}
              >
                <Icon
                  pack="assets"
                  name="minus"
                  style={[
                    globalStyle.icon40,
                    {
                      tintColor: disableMinus
                        ? theme["text-placeholder-color"]
                        : undefined,
                    },
                  ]}
                />
              </TouchableOpacity>
              <Text category="h6" center mh={8} mt={8} style={{ width: 40 }}>
                {durationPerDay}
              </Text>
              <TouchableOpacity activeOpacity={0.54} onPress={onPlus}>
                <Icon pack="assets" name="plus" style={[globalStyle.icon40]} />
              </TouchableOpacity>
            </Flex>
          </Flex>
          <Text category="h8-s" mt={24}>
            {t("noteConfirmHour")}
          </Text>
        </View>
        <View style={styles.inputField}>
          <Icon
            pack="assets"
            name="quote"
            style={{ tintColor: theme["color-basic-400"] }}
          />
          <Controller
            control={control}
            name="messages"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                onChangeText={(text) => {
                  onChange(text), setInputLength(text.length);
                }}
                onBlur={onBlur}
                keyboardType="email-address"
                maxLength={500}
                multiline
                appearance="arena"
                size="large"
              />
            )}
          />
          <InputLengthField />
        </View>
      </Content>
      <Button
        children={t("iConfirmed").toString()}
        style={styles.buttonConfirm}
        onPress={onConfirmed}
      />
    </Container>
  );
});

export default ConfirmHour;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 32,
    paddingBottom: 40,
  },
  top: {
    borderBottomWidth: 1,
    borderColor: "background-basic-color-3",
    marginBottom: 40,
  },
  inputField: {
    marginTop: 40,
  },
  centerField: {
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-3",
    paddingBottom: 40,
  },
  buttonConfirm: {
    marginHorizontal: 24,
    ...globalStyle.shadowBtn,
  },
});
const DATA = [
  {
    title: "Sun",
    isActive: false,
  },
  {
    title: "Mon",
    isActive: false,
  },
  {
    title: "Tue",
    isActive: true,
  },
  {
    title: "Wed",
    isActive: true,
  },
  {
    title: "Thu",
    isActive: true,
  },
  {
    title: "Fri",
    isActive: false,
  },
  {
    title: "Sat",
    isActive: false,
  },
];
