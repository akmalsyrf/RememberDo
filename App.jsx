import React from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic } from "@expo-google-fonts/poppins";

import { extendTheme, NativeBaseProvider, Box, Text } from "native-base";

import Container from "./Container";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_400Regular_Italic,
  });

  const costumeColor = {
    primary: {
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      900: "#164e63",
    },
  };

  const fontConfig = {
    Poppins: {
      400: {
        normal: "Poppins_400Regular",
        italic: "Poppins_400Regular_Italic",
      },
    },
  };

  const theme = extendTheme({
    colors: costumeColor,
    fontConfig,
    fonts: {
      heading: "Poppins",
      body: "Poppins",
      mono: "Poppins",
    },
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      {/* <StatusBar /> */}
      <Box flex={1} backgroundColor="#fff">
        <Container />
      </Box>
    </NativeBaseProvider>
  );
}
