import React from "react";
import { useState } from "react";
import { Form, Modal } from "antd";
import PersonForm from "./PersonForm";
import { useMutation } from "@apollo/client";
import { UPDATE_PERSON } from "../../graphql/queries";

const EditPerson = ({ open, setOpen, firstName, lastName, id }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [updatePerson] = useMutation(UPDATE_PERSON);
  const onFinish = () => {
    const { firstName, lastName } = form.getFieldsValue();
    updatePerson({
      variables: {
        id,
        edits: {
          firstName,
          lastName,
        },
      },
    })
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error updating person", error);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        title="Edit Person"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}>
        <PersonForm
          form={form}
          firstName={firstName}
          lastName={lastName}
          addFlag={false}
          onFinish={onFinish}
          name={firstName + id}
        />
      </Modal>
    </>
  );
};

export default EditPerson;
