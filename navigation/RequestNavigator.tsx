import { createStackNavigator } from "@react-navigation/stack";
import React, { memo } from "react";
import ApplicationDetails from "src/requests/Applications/ApplicationDetails";
import BookingDetails from "src/requests/Bookings/BookingDetails";
import ConfirmHour from "src/requests/Bookings/ConfirmHour";
import InterviewDetails from "src/requests/Interview/InterviewDetails";

import { RequestsStackParamList } from "./types";

const Stack = createStackNavigator<RequestsStackParamList>();
const RequestsNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="InterviewDetails"
    >
      <Stack.Screen name="InterviewDetails" component={InterviewDetails} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
      <Stack.Screen name="ApplicationDetails" component={ApplicationDetails} />
      <Stack.Screen name="ConfirmHour" component={ConfirmHour} />
    </Stack.Navigator>
  );
});
export default RequestsNavigator;
