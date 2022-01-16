import React, { useEffect, useState } from "react";
import { useTheme, IconButton, Checkbox, Text, Box, VStack, HStack, Heading, Button, Image, Center, Pressable, FlatList } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import API from "../config/API";

import ModalAdd from "../components/ModalAddTodo";
import RenderItem from "../components/Todos-TodosByCategory/RenderItem";

export default function Todos({ navigation }) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState();
  const [showModalAdd, setShowModalAdd] = useState(false);

  const [list, setList] = useState([]);
  const getAllTodos = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/todos");
      // console.log(response.data.data);
      setList(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/todo/${id}`);
      getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      let body;
      list.map((li) => {
        if (li.id == id) {
          if (Boolean(li.isCompleted)) {
            body = JSON.stringify({ isCompleted: null });
          } else {
            body = JSON.stringify({ isCompleted: "yes" });
          }
        }
      });
      const response = await API.patch(`/todo/${id}`, body, config);
      // console.log(response.data.data);
      getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToDetail = (item) => {
    navigation.navigate("Todo", {
      idTodo: item.id,
      title: item.title,
      description: item.description,
      dueDate: item.dueDate,
      category: item.category.name,
    });
  };

  const cutDescription = (str) => {
    if (str.length > 75) {
      return (str = str.substring(0, 25) + "...");
    } else {
      return str;
    }
  };

  const modalAddProps = { showModalAdd, setShowModalAdd, getAllTodos };

  const _renderItem = ({ item }) => {
    const funcProps = { handleStatusChange, handleDelete, cutDescription, navigateToDetail };
    return <RenderItem funcProps={funcProps} item={item} />;
  };

  return (
    <Box flex={1}>
      <Heading p="5" borderBottomWidth="2" borderColor="coolGray.200" pb={5} fontSize={30} color={theme.colors.primary["900"]} style={{ fontWeight: "bold" }}>
        All Task
      </Heading>
      {list.length !== 0 ? (
        <FlatList m={5} data={list} renderItem={_renderItem} keyExtractor={(item) => item.id.toString()} refreshing={isLoading} onRefresh={getAllTodos} />
      ) : (
        <VStack m={5}>
          <Image source={require("../assets/empty.png")} alt="empty" size={300} p={5} />
          <Center>
            <Text fontSize={20} marginBottom="1" marginTop="5" color="#164e63" style={{ fontWeight: "bold" }}>
              Oppss.. todo is empty
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
