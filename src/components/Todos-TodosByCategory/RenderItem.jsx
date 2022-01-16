import React from "react";
import { useTheme, Box, Checkbox, IconButton, Pressable, HStack, VStack, Text } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function RenderItem({ item, funcProps }) {
  const theme = useTheme();
  const { handleStatusChange, handleDelete, cutDescription, navigateToDetail } = funcProps;
  return (
    <Box borderBottomWidth="1" borderColor="coolGray.200" pl="1" pr="5" pb="2">
      <HStack w="100%" justifyContent="space-between" alignItems="center">
        <Checkbox isChecked={item.isCompleted} onChange={() => handleStatusChange(item.id)} value={item.title}>
          <IconButton size="lg" colorScheme="trueGray" icon={<Entypo name="cross" size={30} color={theme.colors.primary["900"]} />} onPress={() => handleDelete(item.id)} />
          <Pressable onPress={() => navigateToDetail(item)} w="100%">
            <VStack>
              <Text mx="1" strikeThrough={item.isCompleted} color={item.isCompleted ? "gray.400" : "coolGray.800"} fontSize={20} bold>
                {item.title}
              </Text>
              <Text mx="1" strikeThrough={item.isCompleted} color={item.isCompleted ? "gray.400" : "coolGray.800"}>
                {cutDescription(item.description)}
              </Text>
            </VStack>
          </Pressable>
        </Checkbox>
      </HStack>
    </Box>
  );
}
