import React from "react";
import { useTheme, Text, Button, Center, Image } from "native-base";

export default function Home({ navigation }) {
  const theme = useTheme();
  return (
    <Center flex={1} margin={5}>
      <Text fontSize={40} marginBottom="2" color="#0e7490" style={{ fontWeight: "bold" }}>
        RememberDo
      </Text>
      <Text fontSize={20} marginBottom="25" color="#164e63" style={{ fontWeight: "bold" }}>
        I will remember Your To Do !
      </Text>
      <Image source={require("../assets/ico.png")} alt="home page" size={300} marginBottom="20" />
      <Button bg={theme.colors.primary["900"]} size="lg" onPress={() => navigation.navigate("Todos")}>
        Get Started!
      </Button>
    </Center>
  );
}
