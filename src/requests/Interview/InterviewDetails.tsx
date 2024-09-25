
import React, { memo, useEffect, useState } from "react"; // Added useState and useEffect
import { View, FlatList,TouchableOpacity, Linking  } from "react-native"; // Added FlatList for rendering the table
import { Image } from 'react-native';

import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Button,
  Layout,
} from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";
import dayjs from "utils/dayjs";
import { Request_Status_Type_Enum } from "constants/Types";
import { InterviewDetailsScreenNavigationProp } from "navigation/types";
import UserField from "../components/UserField";
import { GetInvoiceMainView as apiGetInvoiceMainView } from "utils/appwrite";
import { GetInvoiceDetailsView as apiGetInvoiceDetailsView } from "utils/appwrite";
interface Invoice {
  Comp_ID: string;
  DateInvoice: string;
  ID: string;
  InvoiceID: string;
  PLink: string;
  PaymentLink: string;
  Status: string;
  TotalAmount: string;
  TransactionID: string;
};

interface InvoiceDetail {
  ID: string;
  Description: string;  
  Amount: string;  
};

const InterviewDetails = memo(() => {
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["requests", "common"]);
  const [InvoiceData, setInvoiceData] =  useState<Invoice[]>([]);
  const [InvoiceDetails, setInvoiceDetails] = useState<InvoiceDetail[]>([]);

  const route = useRoute<InterviewDetailsScreenNavigationProp>();
  const StatusRequest = route.params.Id;
  const InvoiceID = route.params.Id;
  const onAddToCalendar = () => {};
  const onSendMessage = () => {};
  const onAccept = () => {};
  const onDecline = () => {};



  // Function to fetch data from the API
  const fetchInvoicesData = async () => {
    try {
      const response: Invoice[] = await apiGetInvoiceMainView({ InvoiceID });
      setInvoiceData(response); // Set the fetched data to state 
    const records = await apiGetInvoiceDetailsView({ InvoiceID });
    setInvoiceDetails(records);
    
    
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  useEffect(() => {
    fetchInvoicesData(); // Fetch data when the component mounts
  }, []);




  return (
    <Container style={styles.container}>



      <TopNavigation
        title="Invoice Details"
        accessoryLeft={<NavigationAction />}
      />
      {InvoiceData.map((InvoiceD) => (
      <Text
        center
        category="h8"
        status={
          StatusRequest === "Completed"
            ? "completed"
            : StatusRequest === "Accepted"
            ? "info"
            : "warning"
        }
        mb={8}
      >
        
        
        {InvoiceD.Status}
     

      </Text>
    ))}
      <Content padder contentContainerStyle={styles.content}>

      {InvoiceData.map((InvoiceD) => (
      <View style={styles.details}>
          <Text category="h6">{t("common:details")}</Text>
          <Text category="para-m" mt={16} mb={8}>
            Invoice No:{InvoiceD.InvoiceID}
          </Text>
          <Text category="para-m" mb={8}>
            Invoice Date:{InvoiceD.DateInvoice}
          </Text>

          <Text category="para-m" mb={8}>
            Transaction:{InvoiceD.TransactionID}
          </Text>


          <Text category="para-m" mb={8}>
            Grand Amount:{InvoiceD.TotalAmount}
          </Text>
          <Text category="para-m" mb={8}>
            Tenant:{InvoiceD.Comp_ID}
          </Text>
          <Text category="para-m">Payment Link: </Text>
          <TouchableOpacity onPress={() => Linking.openURL(InvoiceD?.PaymentLink)}>
      <Text category="h7" status="link" mt={5}>
        Click here to pay
      </Text>
    </TouchableOpacity>
        </View>
         ))}
        
{/* Display InvoiceDetails using map */}
{InvoiceDetails.map((detail) => (
          <UserField
            key={detail.ID} // Ensure each UserField has a unique key
            avatar={Images.avatar11}
            name={`${detail.Description}`}// Assuming description is used as the name
            location={`${detail.InvoiceDate} | ${detail.Amount}`} // Replace with actual location if available
            miles={2} // Adjust based on your data
         
          />
        ))}
      
    




        <View style={styles.contact}>
        
        
          {StatusRequest === "Unconfirmed" ? (
            <Text category="h8-s">
              We will provide Christine’s phone number when you are confirmed
            </Text>
          ) : (
            <Text category="h7" status={"link"}>
              QR Paiment
            </Text>



          )}

<Image
      source={{ uri: 'https://example.com/image.jpg' }} // Remote image URL
      style={{ width: 100, height: 100 }}
    />
        </View>
        <View>
          
          
          <Flex>
            
            
            {StatusRequest === "Accepted" ? (
              <Flex justify="flex-start" itemsCenter onPress={onAddToCalendar}>
                <Icon
                  pack="assets"
                  name="calendarRequest"
                  style={styles.iconCalendar}
                />
                <Text status={"link"} category="h8">
                  {t("addToCalendar")}
                </Text>
              </Flex>
            ) : null}
          </Flex>
        </View>
       
        
        {StatusRequest === "Unconfirmed" ? (
          <Text category="h8-s" status={"placeholder"} mb={20}>
            You have 19 hours left to response
          </Text>
        ) : null}
        {StatusRequest == Request_Status_Type_Enum.Completed ||
        StatusRequest == Request_Status_Type_Enum.Accepted ? (
          <>
            <Button
              children={
                StatusRequest === Request_Status_Type_Enum.Completed
                  ? t("deleteInterview").toString()
                  : t("cancelInterview").toString()
              }
              size="small"
              appearance="outline"
              style={styles.cancelInterview}
            />
          </>
        ) : null}
      </Content>
      {StatusRequest == Request_Status_Type_Enum.Completed ||
      StatusRequest == Request_Status_Type_Enum.Accepted ? (
        <Layout
          level="2"
          style={{ marginBottom: bottom + 8, paddingHorizontal: 24 }}
        >
          <Button
            children={t("sendMessage").toString()}
            style={[globalStyle.shadowBtn]}
            onPress={onSendMessage}
          />
        </Layout>
      ) : null}
      {StatusRequest === Request_Status_Type_Enum.Unconfirmed ? (
        <Flex level="2" style={styles.bottom} padder pb={bottom + 8}>
          <Button
            children={t("common:decline").toString()}
            status="outline"
            style={globalStyle.flexOne}
            onPress={onDecline}
          />
          <Button
            children={t("common:accept").toString()}
            style={[globalStyle.flexOne, { marginLeft: 16 }]}
            onPress={onAccept}
          />
        </Flex>
      ) : null}









    </Container>
  );
});

export default InterviewDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingBottom: 120,
  },
  personal: {
    padding: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    ...globalStyle.shadow,
    marginBottom: 40,
  },
  cancelInterview: {
    alignSelf: "center",
    marginBottom: 40,
  },
  dot: {
    width: 2,
    height: 2,
    marginHorizontal: 8,
    alignSelf: "center",
  },
  contact: {
    marginBottom: 40,
  },
  iconCalendar: {
    ...globalStyle.icon16,
    tintColor: "text-placeholder-color",
    marginRight: 8,
  },
  details: {
    marginVertical: 40,
  },
  additional: {
    marginBottom: 40,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...globalStyle.shadowFade,
    paddingTop: 14,
    ...globalStyle.topBorder24,
  },
  
});
