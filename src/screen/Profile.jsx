import React from "react";
import { Center, Text, Box, Image, Stack, Heading } from "native-base";

export default function Profile() {
  return (
    <>
      <Box>
        <Image w={["100%", "100%", "40"]} h="40" source={require("../assets/blank-profile.png")} alt="image" />
        <Center bg="violet.500" _text={{ color: "white", fontWeight: "700", fontSize: "xs" }} position="absolute" bottom="0" px="3" py="1.5">
          NOT LOGIN
        </Center>
      </Box>
      <Stack p="4" space={[3, 3, 1.5]}>
        <Stack space="2">
          <Heading size="lg" ml="-1" style={{ fontWeight: "bold" }}>
            You're not login
          </Heading>
        </Stack>
        <Text fontWeight="400">Nothing available here</Text>
      </Stack>
    </>
  );
}
