import React from "react";
import { useMutation } from "@apollo/client";
import { Divider, Form } from "antd";
import { ADD_PERSON, GET_PEOPLE_WITH_CAR } from "../graphql/queries";

import PersonForm from "./PersonForm";

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
      <PersonForm form={form} onFinish={onFinish} />
    </>
  );
};

export default AddPerson;
