import React, { useState, useEffect, memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { ListOfContractData} from "../../utils/appwrite";
import JobItem from "./components/JobItem";
import { RECOMMEND_DATA } from "constants/Data";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";

const Recommended = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [ContractListData, setContractListData] = useState<any[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ListOfContractData();
        setContractListData(data);  // Assuming data is an array of ability items
      } catch (error) {
        console.error("Error fetching meeting room bookings:", error);
      }
    };

    fetchData();
  }, []);



  return (
    <View style={styles.container}>
      {ContractListData.map((item, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              navigate("FindStack", {
                screen: "JobDetails",
                params: { name: item.name },
              });
            }}
          >
            <JobItem item={item} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

export default Recommended;

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});
