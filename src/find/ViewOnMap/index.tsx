import React, { memo } from "react";
import { View, TouchableOpacity, Platform, Modal, Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  // Modal,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import TabBar from "../../../components/BasicTabBar";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { RECOMMEND_DATA } from "constants/Data";
import Carousel from "react-native-reanimated-carousel";
import JobItem from "../components/JobItem";
import useModal from "hooks/useModal";
import FilterRecommend from "../FilterRecommend";
import { FindStackParamList } from "navigation/types";
import ButtonFill from "components/ButtonFill";
import Flex from "components/Flex";
import { Images } from "assets/images";

const ViewOnMap = memo(() => {
  const { navigate } = useNavigation<NavigationProp<FindStackParamList>>();
  const { height, width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["find", "common"]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const initialRegion = {
    latitude: 37.785834,
    longitude: -122.406417,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0421,
  };
  const [state, setState] = React.useState(initialRegion);
  const refMap = React.useRef<MapView | null>(null);
  const [mapIndex, setMapIndex] = React.useState(0);
  const { visible, hide, show } = useModal(false);
  const _onPress = React.useCallback(() => {
    refMap?.current?.animateToRegion({
      ...initialRegion,
    });
  }, []);

  const renderEventMap = React.useCallback(({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => _onEvent({ item })}
        activeOpacity={0.54}
        style={{ marginHorizontal: 12 }}
      >
        <JobItem item={item} />
      </TouchableOpacity>
    );
  }, []);
  const _onEvent = React.useCallback(({ item }: { item: any }) => {
    navigate("JobDetails", { name: item.name });
  }, []);
  const RenderPin = React.useCallback(
    ({ item }: { item: any }) => {
      return (
        <Marker
          onPress={() => {
            setMapIndex(item.id);
          }}
          coordinate={item.mapLocation}
          children={
            <Image
              source={item.avatar}
              style={{
                width: 48,
                height: 48,
                transform: [{ scale: mapIndex === item.id ? 1 : 0.85 }],
              }}
            />
          }
        />
      );
    },
    [mapIndex]
  );
  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        accessoryLeft={() => <NavigationAction icon="close" />}
        title={t("viewOnMap").toString()}
        appearance="primary"
      />
      <TabBar
        style={styles.tabBar}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        tabs={[t("recommended"), t("newJobs"), t("nearbyYou")]}
      />
      <View>
        <MapView
          ref={refMap}
          provider={PROVIDER_GOOGLE}
          initialRegion={state}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsScale
          onUserLocationChange={(event) => {
            console.log(event.nativeEvent.coordinate);
          }}
          style={[
            styles.mapView,
            {
              width: width,
              height:
                Platform.OS === "android"
                  ? 700 * (height / 812)
                  : 668 * (height / 812),
            },
          ]}
        >
          <Marker
            image={Images.pinLocation}
            coordinate={{ latitude: 37.785834, longitude: -122.406417 }}
          />
          {RECOMMEND_DATA.map((item, i) => {
            return <RenderPin key={i} item={item} />;
          })}
        </MapView>
        <View style={styles.contentJob}>
          <Flex mh={24} mb={24} itemsCenter>
            <ButtonFill
              icon="currentLocation"
              size="medium"
              status="white"
              onPress={_onPress}
            />
            <ButtonFill
              icon="filter"
              size="large"
              status="warning"
              onPress={show}
            />
          </Flex>
          <Carousel
            data={RECOMMEND_DATA}
            width={width}
            windowSize={width}
            height={height / 2.6}
            vertical={false}
            renderItem={renderEventMap}
            onSnapToItem={(index) => {
              setMapIndex(index);
              refMap?.current?.animateToRegion({
                ...initialRegion,
                latitude: RECOMMEND_DATA[index].mapLocation.latitude - 0.011,
                longitude: RECOMMEND_DATA[index].mapLocation.longitude,
              });
            }}
          />
        </View>
      </View>
      <Modal presentationStyle="pageSheet" visible={visible}>
        <FilterRecommend onHide={hide} />
      </Modal>
    </Container>
  );
});

export default ViewOnMap;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  contentJob: {
    position: "absolute",
    bottom: 0,
  },
  tabBar: {
    paddingLeft: 8,
    marginTop: 24,
  },
  content: {},
  mapView: {
    zIndex: -10,
  },
});
