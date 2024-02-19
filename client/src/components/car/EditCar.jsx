import React from "react";
import { useState } from "react";
import { Form, Modal } from "antd";
import { useMutation } from "@apollo/client";
import { UPDATE_CAR } from "../../graphql/queries";
import CarForm from "./CarForm";

const EditCar = ({ open, setOpen, id, year, make, model, price, personId }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [updateCar] = useMutation(UPDATE_CAR);
  const onFinish = () => {
    const { year, make, model, price, personId } = form.getFieldsValue();
    updateCar({
      variables: {
        id,
        edits: {
          year,
          make,
          model,
          price,
          personId,
        },
      },
    })
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error updating car", error);
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
        width={1200}
        title="Edit Car"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}>
        <CarForm
          form={form}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          addFlag={false}
          onFinish={onFinish}
          name={make + model + id}
        />
      </Modal>
    </>
  );
};

export default EditCar;
