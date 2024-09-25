import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Input,
  Button,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { TouchableOpacity } from "react-native-gesture-handler";
import TabBar from "components/TabBar";
import { Controller, useForm } from "react-hook-form";
import SliderDistance from "src/account/components/SliderDistance";
import FilterHour from "../components/FilterHour";
import RegularlySchedule from "./RegularlySchedule";
import { globalStyle } from "styles/globalStyle";

interface FilterRecommendProps {
  onHide?(): void;
}

const FilterRecommend = memo(({ onHide }: FilterRecommendProps) => {
  const { width, bottom, height } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["find", "common"]);
  const [babysitter, setBabysitter] = React.useState(0);
  const [sortBy, setSortBy] = React.useState(0);
  const [value, setValue] = React.useState<number | number[]>(10);
  const [hour, setHour] = React.useState<number | number[]>(15);
  const [regularly, setRegularly] = React.useState(true);
  const [occasional, setOccasional] = React.useState(false);
  const [oneTime, setOneTime] = React.useState(false);
  const [needASAP, setNeedASAP] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "Manhattan, NY",
      keyword: "",
    },
  });
  return (
    <Container
      useSafeArea
      style={[styles.container, { flexGrow: 1, width: width }]}
    >
      <TopNavigation
        title={t("filter").toString()}
        accessoryLeft={() => (
          <TouchableOpacity activeOpacity={0.54} onPress={onHide}>
            <Icon pack="assets" name="close" />
          </TouchableOpacity>
        )}
        accessoryRight={() => (
          <Text category="h7" status={"link"}>
            {t("common:clear")}
          </Text>
        )}
      />
      <Content contentContainerStyle={styles.content} padder>
        <Text category="h2" mb={16}>
          {t("general")}
        </Text>
        <Text category="h7" mb={24}>
          {t("jobType")}
        </Text>
        <TabBar
          selectedIndex={babysitter}
          onChange={setBabysitter}
          tabs={[t("babysitter"), t("nanny")]}
        />
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("location").toString()}
              status={errors.location ? "warning" : "basic"}
              style={styles.location}
              value={value}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.location?.message}
              accessoryRight={() => (
                <Icon pack="assets" name="map" style={styles.iconMap} />
              )}
            />
          )}
        />
        <Text category="h7" mb={24}>
          {t("distance")}
        </Text>
        <SliderDistance valueSlider={value} setValueSlider={setValue} mb={32} />
        <Text category="h7" mb={24}>
          {t("overThisAmountPerHour")}
        </Text>
        <FilterHour valueSlider={hour} setValueSlider={setHour} mb={40} />
        <Text category="h7" mb={24}>
          {t("timing")}
        </Text>
        <RegularlySchedule
          title={t("regularlySchedule")}
          des={t("regularlyScheduleTitle")}
          checked={regularly}
          onChange={() => setRegularly(!regularly)}
        />
        <RegularlySchedule
          title={t("occasional")}
          des={t("occasionalTitle")}
          checked={occasional}
          onChange={() => setOccasional(!occasional)}
        />
        <RegularlySchedule
          title={t("oneTime")}
          des={t("oneTimeTitle")}
          checked={oneTime}
          onChange={() => setOneTime(!oneTime)}
        />
        <RegularlySchedule
          title={t("needASAP")}
          checked={needASAP}
          onChange={() => setNeedASAP(!needASAP)}
        />
        <Text mt={32} category="h2" mb={24}>
          {t("common:other")}
        </Text>
        <Text category="para-m" mb={8}>
          {t("keyword")}
        </Text>
        <Controller
          control={control}
          name="keyword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.keyword}
              value={value}
              status="info"
              size={"large"}
              placeholder="Enter something..."
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              accessoryLeft={<Icon pack="assets" name="search" />}
            />
          )}
        />
        <Text category="h7" mb={26}>
          {t("sortBy")}
        </Text>
        <TabBar
          selectedIndex={sortBy}
          onChange={setSortBy}
          tabs={[t("soonest"), t("closest"), t("highestRate")]}
        />
      </Content>
      <Layout
        level={"2"}
        style={[
          styles.see,
          { paddingBottom: bottom + 8, paddingHorizontal: 24 },
        ]}
      >
        <Button children={t("buttonFilter").toString()} />
      </Layout>
    </Container>
  );
});

export default FilterRecommend;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 32,
    paddingBottom: 120,
    flexGrow: 1,
  },
  location: {
    marginVertical: 32,
    borderBottomWidth: 2,
  },
  iconMap: {
    tintColor: "color-primary-100",
  },
  keyword: {
    ...globalStyle.shadowFade,
    marginBottom: 40,
  },
  see: {
    marginTop: 48,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
