// session.js
import AsyncStorage from "@react-native-async-storage/async-storage";

// Example usage:
export const saveSessionData = async (id: string, name: string , email: string, avatar:string,Code:string,Full_address:string,Phone:string,CrNo:string,Activity:string,createDate:string) => {
  try {
    console.log(avatar);
    await AsyncStorage.setItem("id", id);
    await AsyncStorage.setItem("username", name);
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("avatar", avatar);

    await AsyncStorage.setItem("Code", Code);
    await AsyncStorage.setItem("Full_address", Full_address);
    await AsyncStorage.setItem("Phone", Phone);
    await AsyncStorage.setItem("CrNo", CrNo);
    await AsyncStorage.setItem("Activity", Activity);
    await AsyncStorage.setItem("createDate", createDate);


    
        
    console.log("Session data saved successfully");
  } catch (e) {
    console.error("Failed to save session data", e);
  }
};

export const getUserId = () => {
  return AsyncStorage.getItem("id");
};

export const getUserName = () => {
  return AsyncStorage.getItem("username");
};

export const getUserEmail = () => {
  return AsyncStorage.getItem("email");
};

export const getUserAvatar = () => {
  return AsyncStorage.getItem("avatar");
};

export const getUserCode = () => {
  return AsyncStorage.getItem("Code");
};
export const getUserAddress = () => {
  return AsyncStorage.getItem("Full_address");
};
export const getUserPhone = () => {
  return AsyncStorage.getItem("Phone");
};
export const getUserCrno = () => {
  return AsyncStorage.getItem("CrNo");
};
export const getUserActivity = () => {
  return AsyncStorage.getItem("Activity");
};
export const getUserCreateDate = () => {
  return AsyncStorage.getItem("createDate");
};

export const clearSessionData = () => {
  AsyncStorage.removeItem("id");
  AsyncStorage.removeItem("username");
  AsyncStorage.removeItem("email");
  AsyncStorage.removeItem("avatar");

  AsyncStorage.removeItem("Code");
  AsyncStorage.removeItem("Full_address");
  AsyncStorage.removeItem("Phone");
  AsyncStorage.removeItem("CrNo");
  AsyncStorage.removeItem("Activity");
  AsyncStorage.removeItem("createDate");

  console.log("Session data cleared successfully");
};
