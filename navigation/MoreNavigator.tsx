import { createStackNavigator } from "@react-navigation/stack";
import React, { memo } from "react";
import EditProfile from "src/more/EditProfile";
import MoreSrc from "src/more/MoreSrc";
import MyJobProfile from "src/more/MyJobProfile";
import MyStats from "src/more/MyStats";
import Notification from "src/more/Notification";
import PaymentMethod from "src/more/PaymentMethod";
import ProfileSrc from "src/more/ProfileSrc";
import ReferFriend from "src/more/ReferFriend";

import { MoreStackParamList } from "./types";

const Stack = createStackNavigator<MoreStackParamList>();
const MoreNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MoreSrc"
    >
      <Stack.Screen name="MoreSrc" component={MoreSrc} />
      <Stack.Screen name="MyJobProfile" component={MyJobProfile} />
      <Stack.Screen name="ReferFriend" component={ReferFriend} />
      <Stack.Screen name="MyStats" component={MyStats} />
      <Stack.Screen name="ProfileSrc" component={ProfileSrc} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
});
export default MoreNavigator;
