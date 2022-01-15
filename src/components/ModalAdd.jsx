import React, { useState } from "react";
import { Input, Modal, FormControl, Button, TextArea, Pressable } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import API from "../config/API";

export default function ModalAdd({ props }) {
  const { showModalAdd, setShowModalAdd, getAllTodos } = props;
  const now = Date.now();
  const initDate = new Date(now);

  //add new todo
  const [showDate, setShowDate] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: `${initDate.getFullYear()}-${initDate.getMonth() + 1}-${initDate.getDate()}`,
  });
  // console.log(form.dueDate);

  //handle input date
  const [date, setDate] = useState(initDate);
  const dueDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || initDate;
    setShowDate(Platform.OS === "ios");
    setDate(currentDate);
    setForm({ ...form, dueDate: dueDate });
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      const response = await API.post("/todo", body, config);
      // console.log(response.data.data);
      getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={showModalAdd} onClose={() => setShowModalAdd(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header fontWeight="bold">Add New Todo</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Todo</FormControl.Label>
            <Input name="title" onChangeText={(title) => setForm({ ...form, title })} value={form.title} />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Due date</FormControl.Label>
            <Pressable onPress={() => setShowDate(true)}>
              <FormControl.Label p={2} borderWidth="2" borderColor="coolGray.200">
                {form.dueDate}
              </FormControl.Label>
            </Pressable>
            {showDate && <DateTimePicker testID="dateTimePicker" value={date} mode="date" is24Hour={true} display="default" onChange={onChange} />}
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Description</FormControl.Label>
            <TextArea name="description" onChangeText={(description) => setForm({ ...form, description })} value={form.description} />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModalAdd(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                setShowModalAdd(false);
                handleSubmit();
              }}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
