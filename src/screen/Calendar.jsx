import React, { useEffect, useState } from "react";
import { Box, Center, Heading, useTheme, Button, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import API from "../config/API";

export default function CalendarDisplay() {
  //get all todos
  const [todos, setTodos] = useState([]);
  const getAllTodos = async () => {
    const response = await API.get("/todos");
    setTodos(response.data.data);
  };
  useEffect(() => {
    getAllTodos();
  }, []);

  const dateStyling = {
    blueDots: { marked: true },
    redDots: { marked: true, dotColor: "red" },
    greenDots: { marked: true, dotColor: "green" },
    pullCircle: { selected: true },
  };

  const dueDate = todos.map((todo) => {
    const date = new Date(todo.dueDate);
    return `${date.getFullYear()}-${date.getMonth() < 10 ? 0 : null}${date.getMonth() + 1}-${date.getDate()}`;
  });
  console.log(dueDate);

  //assign dueDate and dateStyling to object
  const markedDates = dueDate.reduce((acc, curr) => ({ ...acc, [curr]: dateStyling.pullCircle }), {});
  // console.log(markedDates);

  const theme = useTheme();

  const [customDate, setCustomDate] = useState("");
  const todayDate = new Date().toISOString().slice(0, 10);
  const selectedDate = customDate ? customDate : todayDate;
  console.log(selectedDate);

  return (
    <Box flex={1}>
      <Center>
        <Heading px="5" py="2" borderBottomWidth="2" borderColor="coolGray.200" fontSize={30} color={theme.colors.primary["900"]} style={{ fontWeight: "bold" }}>
          Calendar
        </Heading>
      </Center>
      <CalendarList
        current={selectedDate}
        markedDates={markedDates}
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
      <Button onPress={() => setCustomDate(todayDate)} bg="red.500" size={50} position="absolute" borderRadius={50} alignItems="center" bottom={20} right={6}>
        <Ionicons name="ios-disc-outline" size={20} color="white" />
      </Button>
      <Button onPress={() => setCustomDate("2020-01-01")} size={60} position="absolute" borderRadius={50} alignItems="center" bottom={4} right={5}>
        <Ionicons name="ios-calendar" size={30} color="white" />
      </Button>
    </Box>
  );
}
