import React, { useState } from "react";
import { Button, Modal, FormControl, Input } from "native-base";

import API from "../config/API";

export default function ModalAddCategory({ props }) {
  const { showModalAdd, setShowModalAdd, getCategories } = props;
  const [categoryName, setCategoryName] = useState("");
  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({ name: categoryName });
      const response = await API.post("/category", body, config);
      //   console.log(response.data.data);
      getCategories();
      setCategoryName("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal isOpen={showModalAdd} onClose={() => setShowModalAdd(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add New Category</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input onChangeText={(categoryName) => setCategoryName(categoryName)} value={categoryName} />
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
    </>
  );
}
