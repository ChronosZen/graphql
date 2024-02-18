import React from "react";
import { useMutation } from "@apollo/client";
import { Input, Divider, Flex, Form, Space } from "antd";
import { ADD_PERSON, GET_PEOPLE_WITH_CAR } from "../graphql/queries";
import SubmitButton from "./SubmitButton";

const AddPerson = () => {
  const [form] = Form.useForm();
  const [addPerson] = useMutation(ADD_PERSON);
  const onFinish = () => {
    const { firstName, lastName } = form.getFieldsValue();
    addPerson({
      variables: {
        person: {
          firstName,
          lastName,
          cars: [],
        },
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE_WITH_CAR });
        console.log(data);
        cache.writeQuery({
          query: GET_PEOPLE_WITH_CAR,
          data: { ...data, people: [...data.people, addPerson] },
        });
      },
    });
  };
  return (
    <>
      <Divider>Add Person</Divider>
      <Form
        onFinish={() => onFinish()}
        form={form}
        name="validateOnly"
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
              <SubmitButton form={form} text="Add Person" />
            </Space>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );
};

export default AddPerson;
