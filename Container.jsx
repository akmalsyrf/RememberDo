import React from "react";
import { Text, useTheme } from "native-base";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Import screen
import Home from "./src/screen/Home";
import Todos from "./src/screen/Todos";

export default function Container() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
          // options={{
          //   title: "Home",
          //   headerStyle: {
          //     backgroundColor: theme.colors.primary["600"],
          //   },
          //   headerTintColor: "white",
          //   headerTitleStyle: {
          //     fontSize: 16,
          //   },
          // }}
        />
        <Stack.Screen
          name="Todos"
          component={Todos}
          options={{
            title: "RememberDo",
            // headerStyle: {
            //   backgroundColor: theme.colors.primary["600"],
            // },
            // headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
