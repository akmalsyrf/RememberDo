import React, { useState } from "react";
import { useTheme, Input, IconButton, Checkbox, Text, Box, VStack, HStack, Heading, Icon, Modal, FormControl, Button, TextArea, Image, Center } from "native-base";
import { Feather, Entypo, FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default function Todos() {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const instState = [
    {
      title: "Code",
      description: "lorem ipsum",
      isCompleted: false,
    },
    {
      title: "Meeting with team at 9",
      description: "lorem ipsum",
      isCompleted: false,
    },
    {
      title: "Check Emails",
      description: "lorem ipsum",
      isCompleted: false,
    },
    {
      title: "Write an article",
      description: "lorem ipsum",
      isCompleted: false,
    },
  ];
  const [list, setList] = useState(instState);
  // const [list, setList] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");

  const addItem = (title, desc) => {
    setList([
      ...list,
      {
        title: title,
        description: desc,
        isCompleted: false,
      },
    ]);
  };

  const handleDelete = (index) => {
    const temp = list.filter((_, itemI) => itemI !== index);
    setList(temp);
  };

  const handleStatusChange = (index) => {
    const temp = list.map((item, itemI) => (itemI !== index ? item : { ...item, isCompleted: !item.isCompleted }));
    setList(temp);
  };

  const cutDescription = (str) => {
    if (str.length > 75) {
      return (str = str.substring(0, 25) + "...");
    } else {
      return str;
    }
  };
  return (
    <Box flex={1}>
      <Heading p="5" borderBottomWidth="2" borderColor="coolGray.200" pb={5} fontSize={30} color={theme.colors.primary["900"]} style={{ fontWeight: "bold" }}>
        All Task
      </Heading>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack m={5} space={2}>
          {list !== "" ? (
            list.map((item, itemI) => (
              <Box borderBottomWidth="1" borderColor="coolGray.200" pl="1" pr="5" pb="2" key={itemI}>
                <HStack w="100%" justifyContent="space-between" alignItems="center" key={item.title + itemI.toString()}>
                  <Checkbox isChecked={item.isCompleted} onChange={() => handleStatusChange(itemI)} value={item.title}>
                    <IconButton size="lg" colorScheme="trueGray" icon={<Entypo name="cross" size={30} color={theme.colors.primary["900"]} />} onPress={() => handleDelete(itemI)} />
                    <VStack>
                      <Text mx="1" strikeThrough={item.isCompleted} color={item.isCompleted ? "gray.400" : "coolGray.800"} fontSize={20} bold>
                        {item.title}
                      </Text>
                      <Text mx="1" strikeThrough={item.isCompleted} color={item.isCompleted ? "gray.400" : "coolGray.800"}>
                        {cutDescription(item.description)}
                      </Text>
                    </VStack>
                  </Checkbox>
                </HStack>
              </Box>
            ))
          ) : (
            <>
              <Image source={require("../assets/empty.png")} alt="empty" size={300} p={5} />
              <Center>
                <Text fontSize={20} marginBottom="1" marginTop="5" color="#164e63" style={{ fontWeight: "bold" }}>
                  Oppss.. todo is empty
                </Text>
                <Text fontSize={20} color="#164e63" style={{ fontWeight: "bold" }}>
                  Add new your own
                </Text>
              </Center>
            </>
          )}
        </VStack>
      </ScrollView>

      {/* modal */}
      <Button onPress={() => setShowModal(true)} size={60} position="absolute" borderRadius={50} alignItems="center" bottom={5} right={5}>
        <Text fontSize={30} color="white">
          +
        </Text>
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add New Todo</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Todo</FormControl.Label>
              <Input onChangeText={(v) => setTitleValue(v)} value={titleValue} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Description</FormControl.Label>
              <TextArea onChangeText={(v) => setDescValue(v)} value={descValue} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                  addItem(titleValue, descValue);
                  setTitleValue("");
                  setDescValue("");
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
