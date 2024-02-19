import React from "react";
import { useMutation } from "@apollo/client";
import { Divider, Form } from "antd";
import { useEffect, useState } from "react";
import { ADD_CAR, GET_PEOPLE, GET_PERSON_ID } from "../../graphql/queries";
import { useQuery, useLazyQuery } from "@apollo/client";
import CarForm from "./CarForm";

const AddCar = () => {
  const [form] = Form.useForm();
  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [getPerson] = useLazyQuery(GET_PERSON_ID);
  const [nameArr, setNameArr] = useState([]);
  const [addCar] = useMutation(ADD_CAR);
  useEffect(() => {
    if (data) {
      const tempNameArr = data.people.map((p) => ({
        value: p.id,
        label: p.firstName + " " + p.lastName,
      }));
      setNameArr(tempNameArr);
    }
  }, [data]);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const handlePersonChange = (personId) => {
    getPerson({ variables: { id: personId } });
  };
  const onFinish = () => {
    const { year, make, model, price, personId } = form.getFieldsValue();
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
        try {
          const existingData = cache.readQuery({
            query: GET_PERSON_ID,
            variables: { id: personId },
          });

          if (existingData) {
            const newCars = [...existingData.person.cars, addCar];

            cache.writeQuery({
              query: GET_PERSON_ID,
              variables: { id: personId },
              data: {
                person: {
                  ...existingData.person,
                  cars: newCars,
                },
              },
            });
          } else {
            console.log("No existing data for this person in the cache.");
          }
        } catch (error) {
          console.error("Error reading from cache", error);
        }
      },
    });
  };

  return (
    <>
      <Divider>Add Car</Divider>
      <CarForm
        form={form}
        nameArr={nameArr}
        onFinish={onFinish}
        handlePersonChange={handlePersonChange}
      />
    </>
  );
};

export default AddCar;
