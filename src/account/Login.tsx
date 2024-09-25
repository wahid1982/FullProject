import React, { memo } from "react";

import { View, Image, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
} from "@ui-kitten/components";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useLayout from "hooks/useLayout";
import useToggle from "hooks/useToggle";
import useAuth from "hooks/useAuth";
import { useTranslation } from "react-i18next";
import Text from "components/Text";
import Container from "components/Container";
import Flex from "components/Flex";
import { Images } from "assets/images";
import { RuleEmail, RulePassword } from "utils/rules";
import { signIn as apiSignIn } from "../../utils/appwrite";
import { RootStackParamList } from "navigation/types";
import { globalStyle } from "styles/globalStyle";


const Login = memo(() => {
  const { navigate, dispatch } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["auth", "common"]);

  const { signIn } = useAuth();
  const nextScreen = React.useCallback((screenName: string) => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [{ name: screenName }],
    });
    dispatch(resetAction);
  }, [dispatch]);
  const [loading, setLoading] = React.useState(false); // Add loading state
  const onLogin = async (data: { email: string; password: string }) => {
    const { email, password } = data;
  
    // Check if email and password fields are not empty
    if (!email || !password) {
      alert(`Please enter both email and password. You entered: ${email || "No email entered"}`);
      return;
    }
    setLoading(true); // Start loading
    try {
      // Call the signIn function from appwrite.js with the email and password
      const response = await apiSignIn({ email, password });

      if (response) {
        // Navigate to the desired screen after successful sign-in
        nextScreen("MainBottomTab");
      } else {
        // Handle case where response is null or undefined (if applicable)
        alert("Sign-in failed, please try again.");
      }
  
     
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";    
      // Display the error message in the alert
      alert(`Error signing in: ${errorMessage}`);

    }
  };

  const [invisible, setInvisible] = useToggle(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "123321",
      password: "Admin",
    },
  });

  const [canContinue, setCanContinue] = React.useState(false);
  React.useEffect(() => {
    setCanContinue(errors.email === undefined && errors.password === undefined);
  }, [errors.email, errors.password]);

  const onForgetPassword = React.useCallback(
    () => navigate("AuthStack", { screen: "ForgetPassword" }),
    [navigate]
  );
  const onSignup = React.useCallback(
    () => navigate("AuthStack", { screen: "Signup" }),
    [navigate]
  );

  return (
    <Container style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <Image source={Images.logo} />
        <Text mt={24} category="h7" mb={72}>
          Welcome Back
        </Text>
        <Controller
          control={control}
          name="email"
          //rules={RuleEmail}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
         // rules={RulePassword}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              status={errors.password ? "warning" : "basic"}
              style={styles.password}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="default"
              caption={errors.password?.message}
              secureTextEntry={invisible}
              accessoryRight={(props) => (
                <TouchableOpacity activeOpacity={0.7} onPress={setInvisible}>
                  <Icon
                    {...props}
                    pack="assets"
                    name={invisible ? "eyeOff" : "eyeOn"}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        />
        <TouchableOpacity
          activeOpacity={0.54}
          onPress={onForgetPassword}
          style={styles.forgetPass}
        >
          <Text category="h8-s" status={"placeholder"} mv={24} center>
            {t("forgetPassword")}?
          </Text>
        </TouchableOpacity>
        <Button
          onPress={handleSubmit(onLogin)}
          disabled={!canContinue}
          style={globalStyle.shadowBtn}
        >
          {t("login").toString()}
        </Button>
        <Text category="h8-s" status={"placeholder"} mt={40} mb={38} center>
          {t("or")}
        </Text>
        <View style={styles.facebook}>
          <Icon pack="assets" name={"facebook"} style={styles.logoSocial} />
          <Button
            status="outline"
            onPress={() => {}}
            children={<Text>{`${t("loginWith").toString()} Facebook`}</Text>}
          />
        </View>
        <View>
          <Icon pack="assets" name={"twitter"} style={styles.logoSocial} />
          <Button
            status="outline"
            onPress={() => {}}
            children={<Text>{`${t("loginWith").toString()} Twitter`}</Text>}
          />
        </View>
      </KeyboardAwareScrollView>
      <Flex center mb={bottom + 16} style={styles.bottom}>
        <Text category="h8-s">{t("dontHaveAcc")}</Text>
        <TouchableOpacity activeOpacity={0.54} onPress={onSignup}>
          <Text status={"link"} category="h8-s">
            {t("signup")}
          </Text>
        </TouchableOpacity>
      </Flex>
    </Container>
  );
});

export default Login;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    marginTop: 40,
    paddingHorizontal: 24,
    zIndex: 10,
  },
  email: {
    borderBottomWidth: 2,
    marginBottom: 24,
  },
  password: {
    borderBottomWidth: 2,
  },
  facebook: {
    marginBottom: 16,
    flex: 1,
  },
  logoSocial: {
    position: "absolute",
    left: 16,
    top: 14,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
  },
  forgetPass: {
    alignSelf: "center",
  },
});
