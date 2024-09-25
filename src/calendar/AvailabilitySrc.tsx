import React, { memo,useState, useEffect } from "react";
import {ScrollView, StyleSheet } from 'react-native';
import { ListMeetingRoom as apiListMeetingRoom, CalendarTimmer as apiCalendarTimmer, MeetingRoomBooking as apiMeetingRoomBooking} from "../../utils/appwrite";
import { View } from "react-native";
import axios from 'axios';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Datepicker,
  Icon,
  Select,
  SelectItem,
  IndexPath,
  CheckBox,
  Button,
} from "@ui-kitten/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import RegularlySchedule from "../find/FilterRecommend/RegularlySchedule";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { AvailabilityPassScreenNavigationProp } from "navigation/types";
import NavigationAction from "components/NavigationAction";
import dayjs from "dayjs";
import Flex from "components/Flex";
import TimePicker from "./TimePicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { globalStyle } from "styles/globalStyle";


const AvailabilitySrc = memo(() => {
  const [selectItems, setSelectItems] = useState([]);
  const [regularlySchedules, setRegularlySchedules] = useState([]);
  const [items, setItems] = useState([]);
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >();
  const [selectedRegularlySchedules, setSelectedRegularlySchedules] = useState<number[]>([]);

  const { goBack } = useNavigation();
  const { t } = useTranslation(["calendar", "common"]);
  const route = useRoute<AvailabilityPassScreenNavigationProp>();
  const [regularly, setRegularly] = React.useState(true);
  const [availableDate, setDate] = React.useState(new Date());
  const [timeStart, setTimeStart] = React.useState(new Date().getTime());
  const [timeEnd, setTimeEnd] = React.useState(
    new Date().getTime() + 30 * 60 * 1000
  );
  const [showPickTimeStart, setShowPickTimeStart] = React.useState(false);
  const [showPickTimeEnd, setShowPickTimeEnd] = React.useState(false);
  const [repeat, setRepeat] = React.useState(false);
  const [weekly, setWeekly] = React.useState(false);
  const [everyWeekday, setWeekday] = React.useState(false);

  const handleConfirmStart = (date: Date) => {
    setTimeStart(date.getTime());
    setShowPickTimeStart(false);
  };
  const handleConfirmEnd = (date: Date) => {
    setTimeEnd(date.getTime());
    setShowPickTimeEnd(false);
  };
  const showTimeStart = () => {
    setShowPickTimeStart(!showPickTimeStart);
  };
  const showTimeEnd = () => {
    setShowPickTimeEnd(!showPickTimeEnd);
  };
  /*const onSave = () => {
    goBack();
  };*/
  const onDelete = () => {
    goBack();
  };

  const onSave = async () => {
    const selectedMeetingRoomId = selectItems[selectedIndex?.row]?.id;
    if (!selectedMeetingRoomId) {
      console.error('No meeting room selected');
      return;
    }

 
    var Dateavailable=dayjs(availableDate).format('YYYY-MM-DD');
var RoomId=selectedMeetingRoomId;
var TimeId=selectedRegularlySchedules.toString();
 TimeId = TimeId.replace(/,/g, '-').toString();
 
    try {
      const response = await apiMeetingRoomBooking({ Dateavailable, RoomId, TimeId });
      if(response.Success)
      {
        alert("Meeting room booked successfully!");
      }else{
        alert("Error during booking");
      }
     
    } catch (error) {
      console.error("Error during booking:", error);
    }

  
  };


  useEffect(() => {
    const fetchSelectData = async () => {
      try {

       const data = await apiListMeetingRoom();
       const response = await axios.post(data);
        
        setSelectItems(response.data); // Assuming response.data is an array of objects
      } catch (error) {
        console.error('Error fetching select data:', error);
      }
    };

    fetchSelectData();
  }, []);

  // Fetch data for RegularlySchedule component
  useEffect(() => {
    const fetchRegularlyScheduleData = async () => {
      try {

        const data = await apiCalendarTimmer();
       const response = await axios.post(data);
               setRegularlySchedules(response.data); // Assuming response.data is an array of objects
      } catch (error) {
        console.error('Error fetching regularly schedule data:', error);
      }
    };

    fetchRegularlyScheduleData();
  }, []);


  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction />}
        title="Meeting Room Schedule"
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>

      
      <Content padder contentContainerStyle={styles.content}>
        { <Datepicker
          style={styles.viewDate}
          label={t("availableDate").toString()}
          status={"basic"}
          min={new Date()}
          onSelect={(nextDate) => {
            setDate(nextDate);
          }}
          onPress={() => null}
          accessoryLeft={(props) => (
            <Flex>
              <Icon pack="assets" name="calendar" {...props} />
              <Text center category="h7" ml={12}>
                {dayjs(availableDate).format("DD-MM-YYYY")}
              </Text>
            </Flex>
          )}
        /> }
   
        <Text category="para-m"  style={styles.boldText}>Select Meeting Room</Text>
        <Select
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
          placeholder="Select one"
          style={styles.consider}  
        >
           {selectItems.map((item) => (
          <SelectItem key={item.id} title={item.title}  />
        ))}

        </Select>

          <Text category="para-m"  style={styles.boldText}>Available Times</Text>
          {regularlySchedules.map((schedule) => (
            <RegularlySchedule
              key={schedule.id}
              title={`From: ${schedule.StartTime} ${schedule.AMPM}  To ${schedule.EndTime}  ${schedule.AMPM}`}
              des={`Regularly Schedule:  ${schedule.Price}`}
              checked={selectedRegularlySchedules.includes(schedule.id)}
              onChange={() => {
                setSelectedRegularlySchedules((prev) => 
                  prev.includes(schedule.id)
                    ? prev.filter(id => id !== schedule.id)
                    : [...prev, schedule.id]
                );
              }}
            />
          ))}

        
        {route.params.type === "Add" ? (
          <Button children="Book Now" onPress={onSave} />
        ) : (
          <Flex>
           
            <Button
              children={t("common:save").toString()}
              onPress={onSave}
              style={globalStyle.flexOne}
            />
          </Flex>
        )}
      </Content>

      </ScrollView>
      <DateTimePickerModal
        isVisible={showPickTimeStart}
        mode={"time"}
        date={new Date()}
        onConfirm={handleConfirmStart}
        onCancel={showTimeStart}
      />
      <DateTimePickerModal
        isVisible={showPickTimeEnd}
        mode={"time"}
        date={new Date()}
        onConfirm={handleConfirmEnd}
        onCancel={showTimeEnd}
      />
    </Container>
  );
});

export default AvailabilitySrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Ensure space at bottom for the button
  },
  boldText: {
    fontWeight: 'bold',
    lineHeight: 30,
  },
  
  content: {
    paddingTop: 32,
  },
  consider: {
    borderBottomWidth: 2,
    borderColor: "background-basic-color-3",
  },
  viewDate: {
    marginBottom: 24,
  },
  checkbox: {
    marginLeft: 36,
  },
  deleteButton: {
    flex: 1,
    marginRight: 16,
  },
});
