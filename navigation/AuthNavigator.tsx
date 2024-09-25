import { createStackNavigator } from "@react-navigation/stack";
import React, { memo } from "react";
import Login from "src/account/Login";
import Signup from "src/account/Signup";

import { AuthStackParamList } from "./types";
import ForgetPassword from "src/account/ForgetPassword";
import NewPassword from "src/account/NewPassword";
import JobPreferences from "src/account/JobPreferences";
import PurchaseBg from "src/account/PurchaseBg";
import IntroduceYourself from "src/account/IntroduceYourself";
import PurchaseBgConfirm from "src/account/PurchaseBgConfirm";
import Verification from "src/account/Verification";
import ApprovalChecklist from "src/account/ApprovalChecklist";
import UploadPhoto from "src/account/UploadPhoto";
import VideoIntroduce from "src/account/VideoIntroduce";

const Stack = createStackNavigator<AuthStackParamList>();
const AuthNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="JobPreferences" component={JobPreferences} />
      <Stack.Screen name="PurchaseBg" component={PurchaseBg} />
      <Stack.Screen name="IntroduceYourself" component={IntroduceYourself} />
      <Stack.Screen name="PurchaseBgConfirm" component={PurchaseBgConfirm} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ApprovalChecklist" component={ApprovalChecklist} />
      <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
      <Stack.Screen name="VideoIntroduce" component={VideoIntroduce} />
    </Stack.Navigator>
  );
});
export default AuthNavigator;
