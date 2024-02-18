import React from "react";
import { useMutation } from "@apollo/client";
import { Input, Divider, Select, Flex, Form, Space, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { ADD_CAR, GET_PEOPLE, GET_PERSON_ID } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import SubmitButton from "./SubmitButton";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

loadDevMessages();
loadErrorMessages();

const AddCar = () => {
  const [form] = Form.useForm();
  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [nameArr, setNameArr] = useState([]);
  const [addCar] = useMutation(ADD_CAR);

  useEffect(() => {
    if (data) {
      const tempNameArr = data.people.map((person) => ({
        value: person.id,
        label: person.firstName + " " + person.lastName,
      }));
      setNameArr(tempNameArr);
    }
  }, [data]);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const onFinish = () => {
    const {
      year,
      make,
      model,
      price,
      person: personId,
    } = form.getFieldsValue();
    addCar({
      variables: {
        car: {
          year,
          make,
          model,
          price,
          personId,
        },
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({
          query: GET_PERSON_ID,
          variables: { id: personId },
        });
        const newCars = [...data.person.cars, addCar];
        cache.writeQuery({
          query: GET_PERSON_ID,
          variables: { id: personId },
          data: {
            person: {
              ...data.person,
              cars: newCars,
            },
          },
        });
      },
    });
  };

  return (
    <>
      <Divider>Add Car</Divider>
      <Form
        form={form}
        name="validateOnly2"
        layout="horizontal"
        autoComplete="off"
        onFinish={() => onFinish()}>
        <Flex justify={"center"} align={"center"} gap={"small"}>
          <Form.Item
            name="year"
            label="Year"
            rules={[
              {
                required: true,
              },
            ]}>
            <InputNumber placeholder="Year" />
          </Form.Item>
          <Form.Item
            name="make"
            label="Make"
            rules={[
              {
                required: true,
              },
              {
                pattern: /^[A-Za-z\d\s]+$/,
                message: "Name can include letters, numbers, and spaces",
              },
            ]}>
            <Input placeholder="Make" />
          </Form.Item>
          <Form.Item
            name="model"
            label="Model"
            rules={[
              {
                required: true,
              },
              {
                pattern: /^[A-Za-z\d\s]+$/,
                message: "Name can include letters, numbers, and spaces",
              },
            ]}>
            <Input placeholder="Model" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
              },
            ]}>
            <InputNumber prefix="$" />
          </Form.Item>
          <Form.Item
            name="person"
            label="Person"
            rules={[
              {
                required: true,
              },
            ]}>
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              options={nameArr}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <SubmitButton form={form} text="Add car" />
            </Space>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );
};

export default AddCar;
