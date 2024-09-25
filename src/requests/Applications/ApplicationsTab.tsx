
import React, { useEffect, useState, memo } from "react";
import Text from "components/Text";
import { View } from "react-native";

import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  IndexPath,
  Select,
  SelectItem,
  Button,
  Layout,
  useTheme,
} from "@ui-kitten/components";

import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { globalStyle } from "styles/globalStyle";
import {
  DATA_CURRENT_APPLICATION,
  DATA_PASS_APPLICATION,
} from "constants/Data";
import ApplicationItem from "./ApplicationItem";
import TitleList from "../components/TitleList";
import { MainBottomTabStackParamList } from "navigation/types";
import { Request_Type_Enum } from "constants/Types";
import { Controller, useForm } from "react-hook-form";
import { fetchPriorities, fetchCategoryByTypes, fetchRequestType, submitRequest } from "utils/appwrite";
const ApplicationsTab = memo(() => {
  const { navigate } =
    useNavigation<NavigationProp<MainBottomTabStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["applications", "common"]);
  const theme = useTheme();
  const [priorities, setPriorities] = useState<SelectItem[]>([]);
  const [types, setTypes] = useState<SelectItem[]>([]);
  const [categories, setCategories] = useState<SelectItem[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");




  const [selectedIndex, setSelectedIndex] = React.useState<  IndexPath | IndexPath[]>();
const onSignup = React.useCallback(() => {}, []);
const [aboutYourSelf, setAboutYourSelf] = React.useState(  ABOUT_YOURSELF.length);




 // Fetch priorities on component mount
 useEffect(() => {
  const fetchInitialData = async () => {
    try {
      const priorityData = await fetchPriorities();
      setPriorities(priorityData);

      // Optionally, fetch categories if needed
      const categoryData = await fetchRequestType();
     setCategories(categoryData);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  fetchInitialData();
}, []);

// Fetch types when category changes
useEffect(() => {
  const fetchTypes = async () => {
    if (selectedCategory !== null) {
      try {

        const typeData = await fetchCategoryByTypes(selectedCategory);
       setTypes(typeData);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    }
  };

  fetchTypes();
}, [selectedCategory]);


const onSubmit = async (data: { Subject: string; Description: string }) => {
  const { Subject, Description } = data;

  if (selectedPriority && selectedType && selectedCategory && Subject && Description) {
    try {
      const response = await submitRequest({
        priorityId: selectedPriority.toString(),
        typeId: selectedCategory.toString(),
        categoryId: selectedType.toString(),
        Title: Subject,
        Message: Description,
      });

      if (response.Success) {
        alert("Request successful Sent!");
      } else {
        alert("Request failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form.");
    }
  } else {
    console.error("Please complete all fields (Subject, Description, Priority, Type, Category) before submitting.");
    alert("Please complete all fields (Subject, Description, Priority, Type, Category) before submitting.");
  }
};



const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  defaultValues: {
    email: "",
    password: "",
    consider: "",
  },
});


  return (
    <View style={styles.container}>
      <>
      <Controller
          control={control}
          name="Subject"          
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("Subject").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.email?.message}
            />
          )}
        />
      </>
      <>
      <Select
        selectedIndex={null}
        name="Priority" 
        onSelect={(index) => {
          const selectedItem = priorities[index.row];
          if (selectedItem) {
            setSelectedPriority(selectedItem.id);
          }
        }}
        placeholder="Select Priority"
        style={styles.consider}
        label={`${t("Priority")}`}
      >
        {priorities.map((item) => (
          <SelectItem key={item.id} title={item.title} />
        ))}

      </Select>

        <Text category="h9" mt={8} mb={26} status="placeholder">
          {t("Select Priority")}
        </Text>
      
      </>

      <>
      <Select
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          const selectedItem = categories[index.row];
          if (selectedItem) {
            setSelectedCategory(selectedItem.id);
          }
        }}

        placeholder="Select Type"
        style={styles.consider}
        label={`${t("Type")}`}
      >
       {categories.map((item) => (
          <SelectItem key={item.id} title={item.title} />
        ))}
      </Select>
    


        <Text category="h9" mt={8} mb={26} status="placeholder">
          {t("select Category")}
        </Text>
      
      </>

      <>
      <Select
        selectedIndex={null}
        onSelect={(index) => {
          const selectedItem = types[index.row];
          if (selectedItem) {
            setSelectedType(selectedItem.id);
          }
        }}
        placeholder="Select Category"
        style={styles.consider}
        label={`${t("Category")}`}
      >
        {types.map((item) => (
          <SelectItem key={item.id} title={item.title}  />
        ))}
      </Select>

        <Text category="h9" mt={8} mb={26} status="placeholder">
          {t("Select Category")}
        </Text>
      
      </>
 
        <Text category="h6" mb={16}>
          {"Description"}
        </Text>
        
        <Icon
          pack="assets"
          name="quote"
          style={{ tintColor: theme["color-basic-400"] }}
        />
<>
<Controller
          control={control}
          name="Description"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.aboutYourSelf}
              value={value}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onChangeText={(text) => {
                onChange(text), setAboutYourSelf(text.length);
              }}
              onBlur={onBlur}
              keyboardType="email-address"
              maxLength={500}
              multiline
              appearance="arena"
              size="large"
            />
          )}
        />

</>
      <>
       <Button
        onPress={handleSubmit(onSubmit)}
        style={[styles.btnNext, globalStyle.shadowBtn]}
      >
        {t("Submit").toUpperCase()}
      </Button>
       
       
      </>
    </View>
  );
});

export default ApplicationsTab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  
  btnNext: {
    marginTop: 32,
  },
  aboutYourSelf: {
    marginTop: 8,
  },
  line: {
    backgroundColor: "background-basic-color-3",
    height: 1,
    marginBottom: 40,
  },
  email: {
    borderBottomWidth: 2,
    marginBottom: 24,
  },
  consider: {
    borderBottomWidth: 2,
    borderColor: "background-basic-color-3",
  },
});
const ABOUT_YOURSELF =
  "I love working with kids. I've always been a mother figure to my family and friends, so it comes natuarlly. Joking around and getting in the mood of a kid is always fun,being able to bring your inner kid out and laugh and roll around with kids is great.";
