import React from "react";
import { StyleProp, ViewProps } from "react-native";

import Text from "components/Text";
import Flex, { FlexProps } from "components/Flex";
import { useTranslation } from "react-i18next";
import { globalStyle } from "styles/globalStyle";
import { Icon } from "@ui-kitten/components";

interface TitleListProps extends FlexProps {
  current: boolean;
  dataLength: number;
  style?: StyleProp<ViewProps>;
  onSeeAll?(): void;
}

const TitleList = ({
  current,
  dataLength,
  style,
  onSeeAll,
  ...props
}: TitleListProps) => {
  const { t } = useTranslation(["requests", "common"]);
  return (
    <Flex style={[style]} {...props}>
      <Flex justify="flex-start" mb={24}>
        <Text category="h6">{current ? t("current") : t("past")}</Text>
        <Text category="para-m" mt={4} ml={8} status="placeholder">
          {dataLength > 0 ? dataLength : null}
        </Text>
      </Flex>
      {current === false ? (
        <Flex itemsCenter mb={24}>
          <Text category="h8" status={"link"} mr={4} onPress={onSeeAll}>
            {t("common:seeAll")}
          </Text>
          <Icon pack="assets" name="arrowRight" style={globalStyle.icon16} />
        </Flex>
      ) : null}
    </Flex>
  );
};

export default TitleList;
