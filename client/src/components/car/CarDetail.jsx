import React, { useState } from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GET_PEOPLE_WITH_CAR, DELETE_CAR } from "../../graphql/queries";

import { useMutation } from "@apollo/client";

import EditCar from "./EditCar";
const CarDetail = ({ car, detailFlag, person, data }) => {
  const [deleteCar] = useMutation(DELETE_CAR);
  const [openCar, setOpenCar] = useState(false);
  const showCarModal = () => {
    setOpenCar(true);
  };
  return (
    <Card
      key={car.id}
      style={{
        borderColor: "gray",
        borderWidth: "1px",
        marginBottom: "8px",
      }}
      type="inner"
      title={car.year + " " + car.make + " " + car.model + " -> $" + car.price}
      actions={
        detailFlag
          ? [
              <EditOutlined
                key={"edit" + car.id}
                onClick={() => showCarModal()}
              />,
              <DeleteOutlined
                key={"delete" + car.id}
                style={{ color: "red" }}
                onClick={() => {
                  deleteCar({
                    variables: { id: car.id },
                    update: (cache, { data: { deleteCar } }) => {
                      cache.writeQuery({
                        query: GET_PEOPLE_WITH_CAR,
                        data: {
                          people: data.people.map((p) => {
                            if (p.id === person.id) {
                              const afterDeleteCar = deleteCar.filter(
                                (car) => car.personId === person.id
                              );

                              return { ...p, cars: afterDeleteCar };
                            }
                            return { ...p };
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
      <EditCar
        key={"edits" + car.id}
        open={openCar}
        setOpen={setOpenCar}
        id={car.id}
        year={car.year}
        make={car.make}
        model={car.model}
        price={car.price}
        personId={car.personId}
      />
    </Card>
  );
};

export default CarDetail;
