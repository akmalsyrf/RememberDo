import React from "react";
import { useTheme } from "native-base";
import { Ionicons } from "@expo/vector-icons";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Import screen
import Home from "./src/screen/Home";
import Todos from "./src/screen/Todos";
import TodosByCategory from "./src/screen/TodosByCategory";
import TodoDetail from "./src/screen/TodoDetail";
import Calendar from "./src/screen/Calendar";
import Category from "./src/screen/Category";
import Profile from "./src/screen/Profile";

function buttonTab() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Todos"
      screenOptions={({ route }) => ({
        // headerMode: "screen",
        // headerTintColor: theme.colors.primary["900"],
        // headerStyle: { backgroundColor: "white" },
        headerShown: false,
        tabBarStyle: ({ focused, color, size }) => {},
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Todos") {
            iconName = focused ? "ios-checkmark-circle" : "ios-checkmark-circle-outline";
          } else if (route.name == "Category") {
            iconName = focused ? "ios-bookmark" : "ios-bookmark-outline";
          } else if (route.name == "Calendar") {
            iconName = focused ? "ios-calendar" : "ios-calendar-outline";
          } else if (route.name == "Profile") {
            iconName = focused ? "ios-happy" : "ios-happy-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary["900"],
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Todos" component={Todos} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

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
          name="Navigation"
          component={buttonTab}
          options={{
            title: "RememberDo",
            headerTitleStyle: {
              fontSize: 20,
            },
            // headerStyle: {
            //   backgroundColor: theme.colors.primary["400"],
            // },
          }}
        />
        <Stack.Screen name="Todos by Category" component={TodosByCategory} />
        <Stack.Screen name="Todo" component={TodoDetail} options={({ route }) => ({ title: route.params.title })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
