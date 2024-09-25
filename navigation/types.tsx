import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import {
  Request_Status_Type_Enum,
  Request_Type_Enum,
  SuccessScreenType,
} from "constants/Types";

export type RootStackParamList = {
  Intro: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  FindStack: NavigatorScreenParams<FindStackParamList>;
  MessagesStack: NavigatorScreenParams<MessagesStackParamList>;
  RequestStack: NavigatorScreenParams<RequestsStackParamList>;
  MainBottomTab: undefined;
  AddMorePayment: undefined;
  HomeAddress: undefined;
  ChangeJobType: undefined;
  SuccessScr: {
    successScr: SuccessScreenType;
  };
};
export type MainBottomTabStackParamList = {
  Find: undefined;
  Messages: undefined;
  Requests: NavigatorScreenParams<RequestsBottomStackParamList>;
  Calendar: undefined;
  More: NavigatorScreenParams<MoreStackParamList>;
};
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgetPassword: undefined;
  NewPassword: undefined;
  JobPreferences: undefined;
  IntroduceYourself: undefined;
  PurchaseBg: undefined;
  PurchaseBgConfirm: {
    trustedCare: boolean;
    priceBgCheck: number;
    mvrCheck: number;
  };
  Verification: undefined;
  ApprovalChecklist: undefined;
  UploadPhoto: undefined;
  VideoIntroduce: undefined;
};
export type FindStackParamList = {
  FindSrc: undefined;
  ViewOnMap: undefined;
  JobDetails: { name: string };
};
export type MessagesStackParamList = {
  Chat: undefined;
  VideoCall: undefined;
};
export type RequestsBottomStackParamList = {
  RequestsSrc: undefined;
  RequestsInPast: { requestType: Request_Type_Enum };
};
export type RequestsStackParamList = {
  InterviewDetails: { type: Request_Status_Type_Enum };
  BookingDetails: { type: Request_Status_Type_Enum };
  ApplicationDetails: { type: Request_Status_Type_Enum };
  ConfirmHour: undefined;
};
export type CalendarStackParamList = {
  CalendarSrc: undefined;
  AvailabilitySrc: { type: "Edit" | "Add" };
};
export type MoreStackParamList = {
  MoreSrc: undefined;
  MyJobProfile: undefined;
  EditProfile: undefined;
  PaymentMethod: undefined;
  MyStats: undefined;
  ProfileSrc: undefined;
  ReferFriend: undefined;
  Notification: undefined;
};
export type ModalScreenNavigationProp = RouteProp<
  RootStackParamList,
  "SuccessScr"
>;
export type AvailabilityPassScreenNavigationProp = RouteProp<
  CalendarStackParamList,
  "AvailabilitySrc"
>;
export type RequestsInPassScreenNavigationProp = RouteProp<
  RequestsBottomStackParamList,
  "RequestsInPast"
>;
export type InterviewDetailsScreenNavigationProp = RouteProp<
  RequestsStackParamList,
  "InterviewDetails"
>;
export type BookingDetailsScreenNavigationProp = RouteProp<
  RequestsStackParamList,
  "BookingDetails"
>;
export type ApplicationDetailsScreenNavigationProp = RouteProp<
  RequestsStackParamList,
  "ApplicationDetails"
>;
export type JobDetailsScreenNavigationProp = RouteProp<
  FindStackParamList,
  "JobDetails"
>;
export type PurchaseBgConfirmNavigationProp = RouteProp<
  AuthStackParamList,
  "PurchaseBgConfirm"
>;
