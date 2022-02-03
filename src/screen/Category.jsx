import React, { useEffect, useState } from "react";
import { useTheme, IconButton, Text, Box, VStack, HStack, Heading, Button, Image, Center, Pressable, FlatList } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import API from "../config/API";

import ModalAdd from "../components/ModalAddCategory";

export default function Categories({ navigation }) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState();
  const [showModalAdd, setShowModalAdd] = useState(false);

  const [list, setList] = useState([]);
  const getCategories = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/categories");
      // console.log(response.data.data);
      setList(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const navigateToTodosByCategory = (item) => {
    navigation.navigate("Todos by Category", {
      idCategory: item.id,
      name: item.name,
    });
  };

  const modalAddProps = { showModalAdd, setShowModalAdd, getCategories };

  const _renderItem = ({ item }) => {
    return (
      <Box borderBottomWidth="1" borderColor="coolGray.200" pl="1" pr="5" pb="2">
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <IconButton size="lg" colorScheme="trueGray" icon={<Ionicons name="ios-bookmark-outline" size={30} color={theme.colors.primary["900"]} />} />
          <Pressable onPress={() => navigateToTodosByCategory(item)} w="100%">
            <VStack>
              <Text mx="1" color="coolGray.800" fontSize={20} bold>
                {item.name}
              </Text>
              <Text mx="1" color="coolGray.800">
                Tap to see all contents
              </Text>
            </VStack>
          </Pressable>
        </HStack>
      </Box>
    );
  };

  return (
    <Box flex={1}>
      <Heading p="5" borderBottomWidth="2" borderColor="coolGray.200" pb={5} fontSize={30} color={theme.colors.primary["900"]} style={{ fontWeight: "bold" }}>
        All Category
      </Heading>
      {list.length !== 0 ? (
        <FlatList m={2} data={list} renderItem={_renderItem} keyExtractor={(item) => item.id.toString()} refreshing={isLoading} onRefresh={getCategories} />
      ) : (
        <VStack m={5}>
          <Image source={require("../assets/empty.png")} alt="empty" size={300} p={5} />
          <Center>
            <Text fontSize={20} marginBottom="1" marginTop="5" color="#164e63" style={{ fontWeight: "bold" }}>
              Oppss.. category is empty
            </Text>
            <Text fontSize={20} color="#164e63" style={{ fontWeight: "bold" }}>
              Add new your own !
            </Text>
          </Center>
        </VStack>
      )}

      {/* modal */}
      <Button onPress={() => setShowModalAdd(true)} size={60} position="absolute" borderRadius={50} alignItems="center" bottom={5} right={5}>
        <Ionicons name="ios-add" size={30} color="white" />
      </Button>
      <ModalAdd props={modalAddProps} />
    </Box>
  );
}
