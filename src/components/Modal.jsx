import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const CustomModal = ({ activeItem, toggle, onSave }) => {
  const [modalData, setModalData] = useState(activeItem);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }
    const updatedData = { ...modalData, [name]: value };
    setModalData(updatedData);
  };

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}> Task Item </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={modalData.title}
              onChange={handleChange}
              placeholder="Enter Task Title"
            />
          </FormGroup>

          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={modalData.description}
              onChange={handleChange}
              placeholder="Enter Task Description"
            />
          </FormGroup>

          <FormGroup check>
            <Label for="completed">
              <Input
                type="checkbox"
                name="completed"
                checked={modalData.completed}
                onChange={handleChange}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(modalData)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;