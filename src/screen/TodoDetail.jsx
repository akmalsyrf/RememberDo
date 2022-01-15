import React from "react";
import { useTheme, Box, Heading, Text, HStack, VStack } from "native-base";

export default function Todo({ route, navigation }) {
  const theme = useTheme();
  const { idTodo, title, description, dueDate } = route.params;
  const date = new Date(dueDate);
  const finalDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  return (
    <Box flex={1}>
      <HStack justifyContent="space-between" alignItems="center" borderBottomWidth="2" borderColor="coolGray.200">
        <Heading w={230} p={5} fontSize={30} color={theme.colors.primary["900"]} style={{ fontWeight: "bold" }}>
          {title}
        </Heading>
        <VStack p={5}>
          <Text style={{ fontWeight: "bold" }}>Due date:</Text>
          <Text>{finalDate}</Text>
        </VStack>
      </HStack>
      <Text my={2} mx={5} style={{ fontWeight: "bold" }}>
        Category : None
      </Text>
      <Text my={2} mx={5}>
        {description}
      </Text>
    </Box>
  );
}
