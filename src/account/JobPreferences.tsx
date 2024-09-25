import React, { memo } from "react";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  CheckBox,
  Layout,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import SignupHeader from "./components/StepTitle";
import Flex from "components/Flex";
import { Controller, useForm } from "react-hook-form";
import SliderDistance from "./components/SliderDistance";
import { TouchableOpacity } from "react-native-gesture-handler";
import AgeExpItem from "./components/AgeExpItem";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "navigation/types";
import { globalStyle } from "styles/globalStyle";

const JobPreferences = memo(() => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const { width } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["auth", "common"]);

  const [value, setValue] = React.useState<number | number[]>(10);
  const [disableMinus, setDisableMinus] = React.useState(false);
  const [maxChildren, setMaxChildren] = React.useState(4);
  const [checkedYes, setCheckedYes] = React.useState(false);
  const [aboutYourSelf, setAboutYourSelf] = React.useState(
    ABOUT_YOURSELF.length
  );

  const {
    control,
    handleSubmit,
    getValues,
    formState: {},
  } = useForm({
    defaultValues: {
      min: "15",
      max: "20",
      yearExp: "8",
      aboutYourSelf: ABOUT_YOURSELF,
    },
  });

  const onMinus = React.useCallback(() => {
    setMaxChildren(maxChildren - 1);
  }, [maxChildren]);
  const onPlus = React.useCallback(() => {
    setMaxChildren(maxChildren + 1);
  }, [maxChildren]);
  React.useEffect(() => {
    if (maxChildren <= 1) {
      setDisableMinus(true);
    } else {
      setDisableMinus(false);
    }
  }, [maxChildren]);
  React.useEffect(() => {
    setAboutYourSelf(getValues("aboutYourSelf").length);
  }, [getValues("aboutYourSelf")]);

  const InputField = React.useCallback(() => {
    return (
      <Text
        category="h8"
        status={"placeholder"}
        right
        mt={16}
      >{`${aboutYourSelf}/500`}</Text>
    );
  }, [aboutYourSelf]);

  const onNext = React.useCallback(() => navigate("PurchaseBg"), []);
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        enableOnAndroid
        scrollEventThrottle={16}
        extraScrollHeight={120}
        showsVerticalScrollIndicator={false}
      >
        <SignupHeader
          title={t("jobPreferences")}
          description={t("titleJobPreferences")}
          step={1}
        />
        <Text category="h6">{t("baseHourlyRate")}</Text>
        <Text category="para-m" mv={16}>
          1 {t("child")}
        </Text>
        <Flex mb={24}>
          <Controller
            control={control}
            name="min"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t("min").toString()}
                style={styles.min}
                value={value}
                onChangeText={onChange}
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                onBlur={onBlur}
                keyboardType="numbers-and-punctuation"
                accessoryLeft={<Icon pack="assets" name="dollar" />}
              />
            )}
          />
          <Controller
            control={control}
            name="max"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t("toMax").toString()}
                style={styles.max}
                value={value}
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numbers-and-punctuation"
                accessoryLeft={<Icon pack="assets" name="dollar" />}
              />
            )}
          />
        </Flex>
        <Flex justify="flex-start" mb={37}>
          <Icon pack="assets" name="dollar" style={styles.dollar} />
          <Text status={"link"} category="para-m" ml={12} mt={3}>
            {t("addMoreHourlyRate")}
          </Text>
        </Flex>
        <Text category="h7" mb={24}>
          {t("maximumDistance")}
        </Text>
        <SliderDistance valueSlider={value} setValueSlider={setValue} mb={40} />
        <Flex mb={40}>
          <Text category="para-m" maxWidth={175 * (width / 375)}>
            {t("maximumNumberOfChildren")}
          </Text>
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
                  styles.minus,
                  {
                    tintColor: disableMinus
                      ? theme["text-placeholder-color"]
                      : undefined,
                  },
                ]}
              />
            </TouchableOpacity>
            <Text category="h6" center mh={8} mt={8} style={{ width: 40 }}>
              {maxChildren}
            </Text>
            <TouchableOpacity activeOpacity={0.54} onPress={onPlus}>
              <Icon pack="assets" name="plus" style={[styles.plus]} />
            </TouchableOpacity>
          </Flex>
        </Flex>
        <Text category="h7" mb={28}>
          {t("workInAHomeWithPets")}
        </Text>
        <CheckBox
          checked={checkedYes}
          onChange={(checked) => setCheckedYes(checked)}
          style={styles.checkbox}
        >
          {t("yesILovePets").toString()}
        </CheckBox>
        <CheckBox
          checked={!checkedYes}
          onChange={(checked) => setCheckedYes(!checked)}
          style={styles.checkbox}
        >
          {t("noImNot").toString()}
        </CheckBox>
        <Layout style={styles.line} />
        <Text category="h6" mb={24}>
          {t("workExp")}
        </Text>
        <Controller
          control={control}
          name="yearExp"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("yearsExp").toString()}
              style={styles.yearExp}
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="numbers-and-punctuation"
            />
          )}
        />
        <Text category="para-m" mb={28}>
          {t("whatAgeHaveExp")}
        </Text>
        <Flex wrap justify="flex-start">
          {DATA.map((item, i) => {
            return <AgeExpItem item={item} key={i} />;
          })}
        </Flex>
        <Layout style={styles.line} />
        <Text category="h6" mb={16}>
          {t("writeSomethingAboutU")}
        </Text>
        <Text category="para-s" mb={24}>
          {t("writeSomethingAboutUTitle")}
        </Text>
        <Icon
          pack="assets"
          name="quote"
          style={{ tintColor: theme["color-basic-400"] }}
        />
        <Controller
          control={control}
          name="aboutYourSelf"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.aboutYourSelf}
              value={value}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onChangeText={(text) => {
                onChange(text), setAboutYourSelf(text.length);
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
        <InputField />
        <Button
          onPress={onNext}
          children={`${t("common:next").toUpperCase()}`}
          style={[styles.btnNext, globalStyle.shadowBtn]}
        />
      </KeyboardAwareScrollView>
    </Container>
  );
});

export default JobPreferences;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  min: {
    borderBottomWidth: 2,
    flex: 1,
  },
  max: {
    borderBottomWidth: 2,
    flex: 1,
    marginLeft: 32,
  },
  dollar: {
    tintColor: "color-primary-100",
  },
  minus: {
    width: 40,
    height: 40,
  },
  plus: {
    width: 40,
    height: 40,
  },
  checkbox: {
    marginBottom: 24,
  },
  line: {
    backgroundColor: "background-basic-color-3",
    height: 1,
    marginBottom: 40,
  },
  yearExp: {
    borderBottomWidth: 2,
    marginBottom: 24,
  },
  aboutYourSelf: {
    marginTop: 8,
  },
  btnNext: {
    marginTop: 32,
  },
});
const DATA = [
  { id: 0, title: "Infant", des: "Age 0-11 month", icon: "infant" },
  { id: 1, title: "Toddler", des: "Age 1-3 yrs", icon: "toddler" },
  { id: 2, title: "Pre-School", des: "Age 4-5 yrs", icon: "preSchool" },
  { id: 3, title: "Elementary", des: "Age 6-10 yrs", icon: "tutoring" },
  { id: 4, title: "Junior-High", des: "Age 11+ yrs", icon: "junior" },
];

const ABOUT_YOURSELF =
  "I love working with kids. I've always been a mother figure to my family and friends, so it comes natuarlly. Joking around and getting in the mood of a kid is always fun,being able to bring your inner kid out and laugh and roll around with kids is great.";
