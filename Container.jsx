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
import Todo from "./src/screen/TodoDetail";

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
        />
        <Stack.Screen
          name="Todos"
          component={Todos}
          options={{
            title: "RememberDo",
            headerTitleStyle: {
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen name="Todo" component={Todo} options={({ route }) => ({ title: route.params.title })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
