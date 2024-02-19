import React, { useState } from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  GET_PEOPLE_WITH_CAR,
  DELETE_PERSON,
  DELETE_CAR,
} from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import EditPerson from "./EditPerson";
import CarDetail from "../car/CarDetail";
const PersonDetail = ({ person, data, detailFlag = true }) => {
  const [deletePerson] = useMutation(DELETE_PERSON);
  const [deleteCar] = useMutation(DELETE_CAR);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  return (
    <Card
      style={{
        borderColor: "gray",
        borderWidth: "2px",
        marginBottom: "16px",
      }}
      title={person.firstName + " " + person.lastName}
      actions={
        detailFlag
          ? [
              <EditOutlined
                key={"edit" + person.id}
                onClick={() => showModal()}
              />,
              <DeleteOutlined
                key={"delete" + person.id}
                style={{ color: "red" }}
                onClick={() => {
                  person.cars.forEach((car) => {
                    deleteCar({
                      variables: { id: car.id },
                    });
                  });
                  deletePerson({
                    variables: { id: person.id },
                    update: (cache, { data: { deletePerson } }) => {
                      const data = cache.readQuery({
                        query: GET_PEOPLE_WITH_CAR,
                      });
                      cache.writeQuery({
                        query: GET_PEOPLE_WITH_CAR,
                        data: {
                          people: data.people.filter((p) => {
                            return p.id !== deletePerson.id;
                          }),
                        },
                      });
                    },
                  });
                }}
              />,
            ]
          : []
      }>
      <EditPerson
        open={open}
        setOpen={setOpen}
        firstName={person.firstName}
        lastName={person.lastName}
        id={person.id}
      />
      {person.cars.length > 0 ? (
        person.cars.map((car) => {
          return (
            <CarDetail
              key={"cardetail" + car.id}
              car={car}
              detailFlag={detailFlag}
              person={person}
              data={data}
            />
          );
        })
      ) : (
        <></>
      )}

      {detailFlag ? (
        <Link to={`/person/${person.id}`}>Learn More</Link>
      ) : (
        <Link to={`/`}>Go back home</Link>
      )}
    </Card>
  );
};

export default PersonDetail;
