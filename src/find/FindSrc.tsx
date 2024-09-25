import React, { memo } from "react";
import { FlatList, Modal } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  ViewPager,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import BasicTabBar from "../../components/BasicTabBar";
import Recommended from "./Recommended";
import keyExtractor from "utils/keyExtractor";
import useModal from "hooks/useModal";
import FilterRecommend from "./FilterRecommend";
import { RootStackParamList } from "navigation/types";
import ButtonFill from "components/ButtonFill";
import { globalStyle } from "styles/globalStyle";
import ModalRequest from "components/ModalRequest";
import { Images } from "assets/images";
import { waitUtil } from "utils/waitUtil";

const FindSrc = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { height, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["find", "common"]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const { visible: visbleFilter, show, hide } = useModal(false);
  const { visible, show: showReq, hide: hideReq } = useModal(true);
  React.useEffect(() => {
    waitUtil(1200).then(() => {
      showReq();
    });
  }, []);

  const ListFooterComponent = React.useCallback(() => {
    return (
      <ViewPager
        selectedIndex={activeIndex}
        onSelect={(index) => setActiveIndex(index)}
        swipeEnabled={false}
      >
        <Recommended />
        <></>
        <></>
        <></>
        <></>
      </ViewPager>
    );
  }, [activeIndex]);
  const renderItem = React.useCallback(
    (item: any) => {
      return (
        <BasicTabBar
          style={styles.tabBar}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          tabs={[t("Contract"), t("newJobs"), t("nearbyYou")]}
        />
      );
    },
    [activeIndex]
  );

  const _onMap = React.useCallback(() => {
    navigate("FindStack", { screen: "ViewOnMap" });
  }, []);
  return (
    <>
      <Container style={styles.container}>
        <TopNavigation
          title="Home"          
        />
        <FlatList
          data={[1]}
          stickyHeaderIndices={[1]}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={<></>}
          ListFooterComponent={ListFooterComponent}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.content}
        />
        
      </Container>
      <Modal visible={visbleFilter}>
        <FilterRecommend onHide={hide} />
      </Modal>
      {/* Modal request job notification*/}
      
    </>
  );
});

export default FindSrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tabBar: {
    paddingLeft: 12,
    paddingBottom: 8,
    paddingTop: 24,
    backgroundColor: "background-basic-color-1",
  },
  content: {
    paddingBottom: 120,
  },
  filter: {
    position: "absolute",
    right: 12,
    bottom: 60,
  },
});
