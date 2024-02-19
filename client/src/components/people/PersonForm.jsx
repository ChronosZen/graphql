import React from "react";
import { Input, Flex, Form, Space } from "antd";
import SubmitButton from "../SubmitButton";
const PersonForm = ({
  form,
  onFinish,
  firstName = "",
  lastName = "",
  addFlag = true,
  name = "addPerson",
}) => {
  const initialValues = addFlag ? {} : { firstName, lastName };
  return (
    <Form
      initialValues={initialValues}
      onFinish={() => {
        onFinish();
        form.resetFields();
      }}
      form={form}
      name={name}
      layout="horizontal"
      autoComplete="off">
      <Flex justify={"center"} align={"center"} gap={"small"}>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
            },
            {
              pattern: /^[A-Za-z\s]+$/,
              message: "Name can only include letters and spaces",
            },
          ]}>
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
            },
            {
              pattern: /^[A-Za-z\s]+$/,
              message: "Name can only include letters and spaces",
            },
          ]}>
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item>
          <Space>
            <SubmitButton form={form} text={addFlag ? "Add Person" : "Edit"} />
          </Space>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default PersonForm;
