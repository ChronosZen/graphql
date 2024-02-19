import React from "react";
import { Input, Select, Flex, Form, Space, InputNumber } from "antd";
import SubmitButton from "../SubmitButton";

const CarForm = ({
  form,
  onFinish,
  handlePersonChange,
  nameArr,
  year,
  make,
  model,
  price,
  addFlag = true,
  name,
}) => {
  const initialValues = addFlag ? {} : { year, make, model, price };

  return (
    <Form
      initialValues={initialValues}
      form={form}
      name={name}
      layout="horizontal"
      autoComplete="off"
      onFinish={(e) => {
        onFinish(e);
        form.resetFields();
      }}>
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
        {addFlag && (
          <Form.Item
            name="personId"
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
              onChange={handlePersonChange}
              options={nameArr}
            />
          </Form.Item>
        )}
        <Form.Item>
          <Space>
            <SubmitButton form={form} text={addFlag ? "Add Car" : "Edit Car"} />
          </Space>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default CarForm;
