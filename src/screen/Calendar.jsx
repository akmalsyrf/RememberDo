import React, { useState } from "react";
import { Box, Center, Heading, useTheme, Button, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default function CalendarDisplay() {
  const theme = useTheme();

  const [customDate, setCustomDate] = useState("");
  const todayDate = new Date().toISOString().slice(0, 10);
  const selectedDate = customDate ? customDate : todayDate;
  // console.log(selectedDate);
  return (
    <Box flex={1}>
      <Center>
        <Heading px="5" py="2" borderBottomWidth="2" borderColor="coolGray.200" fontSize={30} color={theme.colors.primary["900"]} style={{ fontWeight: "bold" }}>
          Calendar
        </Heading>
      </Center>
      <CalendarList
        current={todayDate}
        markedDates={{
          "2022-01-19": { selected: true, endingDay: true, color: "green", textColor: "gray" },
          "2022-01-17": { marked: true },
          "2022-01-18": { marked: true, dotColor: "red", activeOpacity: 0 },
          "2022-01-19": { disabled: true, startingDay: true, color: "green", endingDay: true },
        }}
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        onVisibleMonthsChange={(months) => {}}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
      />
      <Button onPress={() => setCustomDate("2012-01-01")} size={60} position="absolute" borderRadius={50} alignItems="center" bottom={5} right={5}>
        <Ionicons name="ios-calendar" size={30} color="white" />
      </Button>
    </Box>
  );
}
