import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Button,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import * as Clipboard from "expo-clipboard";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";
import ButtonFill from "components/ButtonFill";
import { Controller, useForm } from "react-hook-form";
import { RuleEmail, RuleName } from "utils/rules";

const ReferFriend = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["invitedFriend", "auth", "common"]);

  const [didGetRefer, setRefer] = React.useState(true);

  const [copiedText, setCopiedText] = React.useState("");
  const [copyPromoCode, setCopyPromoCode] = React.useState(false);
  const [copyLink, setCopyLink] = React.useState(false);

  const PROMOTION_CODE = "EDITH345928";
  const REFER_LINK = "caren.io/refer/u345928";

  const copyToClipboard = (str: string) => {
    Clipboard.setString(str);
    setCopiedText(str);
  };

  // Get copied Text
  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getStringAsync();
  // };

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "lehieuds@gmail.com",
      name: "Edith Johnson",
    },
  });

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} />
      {didGetRefer ? (
        <Content padder>
          <Text category="h2" mt={16} mb={40}>
            {t("getRefer")}
          </Text>
          <Controller
            control={control}
            name="name"
            rules={RuleName}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t("profile:fullName").toString()}
                status={errors.name ? "warning" : "basic"}
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                onBlur={onBlur}
                keyboardType="email-address"
                caption={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={RuleEmail}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t("auth:email").toString()}
                status={errors.email ? "warning" : "basic"}
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                onBlur={onBlur}
                keyboardType="email-address"
                caption={errors.email?.message}
              />
            )}
          />
          <Button
            children={t("get10credit").toString()}
            style={styles.button}
            onPress={() => {
              setRefer(false);
            }}
          />
        </Content>
      ) : (
        <Content padder>
          <Text category="h2" mt={16} mb={40}>
            {t("referForFriend")}
          </Text>
          <Text category="h8-s" center mb={36}>
            {t("getReferTitle")}
          </Text>
          <Flex
            style={styles.clipboard}
            level="2"
            onPress={() => {
              copyToClipboard(PROMOTION_CODE);
              setCopyLink(false);
              setCopyPromoCode(true);
            }}
          >
            <Text category="h7">{PROMOTION_CODE}</Text>
            <Text category="h7" status={copyPromoCode ? "success" : "link"}>
              {copyPromoCode ? "Copied" : "Copy"}
            </Text>
          </Flex>
          <Text center mv={32}>
            {t("orShare")}
          </Text>
          <Flex
            style={styles.clipboard}
            level="2"
            onPress={() => {
              copyToClipboard(REFER_LINK);
              setCopyPromoCode(false);
              setCopyLink(true);
            }}
          >
            <Text category="h7">{REFER_LINK}</Text>
            <Text category="h7" status={copyLink ? "success" : "link"}>
              {copyLink ? "Copied" : "Copy"}
            </Text>
          </Flex>
          <Text center mt={32} mb={20}>
            {t("shareVia")}
          </Text>
          <Flex mh={48}>
            {DATA_SOCIAL.map((item, i) => {
              return (
                /* @ts-ignore */
                <ButtonFill icon={item.icon} key={i} status={item.status} />
              );
            })}
          </Flex>
          <Text category="h8-s" mt={16} center>
            {t("description")}
          </Text>
        </Content>
      )}
    </Container>
  );
});

export default ReferFriend;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  clipboard: {
    padding: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    ...globalStyle.shadow,
  },
  input: {
    borderBottomWidth: 2,
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
  },
});
const DATA_SOCIAL = [
  {
    id: 0,
    icon: "facebook",
    status: "facebook",
  },
  {
    id: 1,
    icon: "instagram",
    status: "neutral",
  },
  {
    id: 2,
    icon: "twitter",
    status: "twitter",
  },
  {
    id: 3,
    icon: "send",
    status: "danger",
  },
];
