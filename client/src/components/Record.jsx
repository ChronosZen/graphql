import { Divider, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_PEOPLE_WITH_CAR, DELETE_PERSON } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
const Record = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE_WITH_CAR);
  const [peopleArr, setPeopleArr] = useState([]);
  const [deletePerson] = useMutation(DELETE_PERSON);
  useEffect(() => {
    if (data) setPeopleArr(data.people);
  }, [data]);

  if (error) return `Error! ${error.message}`;

  console.log("data", data);
  return (
    <>
      <Divider>Records</Divider>
      {peopleArr.length > 0 ? (
        peopleArr.map((person) => {
          return (
            <Card
              key={person.id}
              style={{
                borderColor: "gray",
                borderWidth: "2px",
                marginBottom: "16px",
              }}
              title={person.firstName + " " + person.lastName}
              actions={[
                <EditOutlined key="edit" />,
                <DeleteOutlined
                  key="delete"
                  style={{ color: "red" }}
                  onClick={() => {
                    deletePerson({
                      variables: { id: person.id },
                      update: (cache, { data: { deletePerson } }) => {
                        const data = cache.readQuery({
                          query: GET_PEOPLE_WITH_CAR,
                        });
                        console.log(data.people);

                        cache.writeQuery({
                          query: GET_PEOPLE_WITH_CAR,
                          data: {
                            people: data.people.filter((p) => {
                              console.log(p.id, deletePerson.id);
                              return p.id !== deletePerson.id;
                            }),
                          },
                        });
                      },
                    });
                  }}
                />,
              ]}>
              {person.cars.length > 0 ? (
                person.cars.map((car) => {
                  return (
                    <Card
                      key={car.id}
                      style={{
                        borderColor: "gray",
                        borderWidth: "1px",
                        marginBottom: "8px",
                      }}
                      type="inner"
                      title={
                        car.year +
                        " " +
                        car.make +
                        " " +
                        car.model +
                        " -> $" +
                        car.price
                      }
                      actions={[
                        <EditOutlined key="edit" />,
                        <DeleteOutlined
                          key="delete"
                          style={{ color: "red" }}
                        />,
                      ]}
                    />
                  );
                })
              ) : (
                <></>
              )}

              <Link to="/person">Learn More</Link>
            </Card>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default Record;
