import React, { useEffect, useState } from "react";
import { useTheme, IconButton, Checkbox, Text, Box, VStack, HStack, Heading, Button, Image, Center, Pressable, FlatList } from "native-base";
import { Entypo } from "@expo/vector-icons";

import API from "../config/API";

import ModalAdd from "../components/ModalAdd";

export default function Todos({ navigation }) {
  const theme = useTheme();
  const [showModalAdd, setShowModalAdd] = useState(false);

  const [list, setList] = useState([]);
  const getAllTodos = async () => {
    try {
      const response = await API.get("/todos");
      setList(response.data.data);
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
        if (li.id == 6) {
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

  const cutDescription = (str) => {
    if (str.length > 75) {
      return (str = str.substring(0, 25) + "...");
    } else {
      return str;
    }
  };

  const modalAddProps = { showModalAdd, setShowModalAdd, getAllTodos };

  const _renderItem = ({ item }) => {
    return (
      <Box borderBottomWidth="1" borderColor="coolGray.200" pl="1" pr="5" pb="2">
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <Checkbox isChecked={item.isCompleted} onChange={() => handleStatusChange(item.id)} value={item.title}>
            <IconButton size="lg" colorScheme="trueGray" icon={<Entypo name="cross" size={30} color={theme.colors.primary["900"]} />} onPress={() => handleDelete(item.id)} />
            <Pressable onPress={() => navigation.navigate("Todo", { idTodo: item.id, title: item.title, description: item.description, dueDate: item.dueDate })}>
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
  };

  return (
    <Box flex={1}>
      <Heading p="5" borderBottomWidth="2" borderColor="coolGray.200" pb={5} fontSize={30} color={theme.colors.primary["900"]} style={{ fontWeight: "bold" }}>
        All Task
      </Heading>
      {list.length !== 0 ? (
        <FlatList m={5} data={list} renderItem={_renderItem} keyExtractor={(item) => item.id.toString()} />
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
        <Text fontSize={30} color="white">
          +
        </Text>
      </Button>
      <ModalAdd props={modalAddProps} />
    </Box>
  );
}
