import React, { memo, useState, useEffect } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Avatar,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { MainBottomTabStackParamList } from "navigation/types";
import { Images } from "assets/images";
import ProfileTag from "./components/ProfileTab";
import { getUserEmail, getUserName, getUserAvatar,getUserAddress,getUserPhone } from "utils/session";

const ProfileSrc = memo(() => {
  const { navigate } =
    useNavigation<NavigationProp<MainBottomTabStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["profile", "common"]);

  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const name = await getUserName();
        const avatar = await getUserAvatar();
        const phone = await getUserPhone();
        const address = await getUserAddress();
        const email = await getUserEmail();
        
        setUserName(name);
        setUserAvatar(avatar);
        setUserPhone(phone);
        setUserAddress(address);
        setUserEmail(email);
      
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const _onEdit = () => navigate("More", { screen: "EditProfile" });
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("title").toString()}
        accessoryLeft={<NavigationAction />}
        accessoryRight={<NavigationAction icon="edit" onPress={_onEdit} />}
      />
      <Content contentContainerStyle={styles.content} padder>
        <Avatar
          source={userAvatar ? { uri: userAvatar } : Images.avatar2}
          shape="rounded"
          size={"giant"}
          /* @ts-ignore */
          style={styles.avatar}
        />
        <ProfileTag label={t("fullName")} title={userName || ""} />
        <ProfileTag label={t("common:email")} title={userEmail || ""} />
        <ProfileTag
          label={t("Password")}
          title="Edith Johnson"
          secureTextEntry
        />
        <ProfileTag label={t("phoneNumber")} title={userPhone || ""} />
        <ProfileTag
          label={t("homeAddress")}
          title={userAddress || ""}
        />
      </Content>
    </Container>
  );
});

export default ProfileSrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 40,
  },
  avatar: {
    alignSelf: "center",
    marginBottom: 48,
  },
});
