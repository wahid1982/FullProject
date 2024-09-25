import React from "react";
import { TouchableOpacity } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
import { adUnitID } from "utils/ads";

interface Props {
  bannerSize?:
    | "banner"
    | "largeBanner"
    | "mediumRectangle"
    | "fullBanner"
    | "leaderboard"
    | "smartBannerPortrait"
    | "smartBannerLandscape";
  mt?: number;
  mb?: number;
}

const AdMob = ({ mt, mb, bannerSize = "banner" }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        {
          alignItems: "center",
          marginBottom: mb,
          marginTop: mt,
        },
      ]}
    >
      <AdMobBanner
        bannerSize={bannerSize}
        adUnitID={adUnitID}
        servePersonalizedAds
        onDidFailToReceiveAdWithError={(e) => console.log(e)}
      />
    </TouchableOpacity>
  );
};

export default AdMob;
