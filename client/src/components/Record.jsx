import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import { GET_PEOPLE_WITH_CAR } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import PersonDetail from "./PersonDetail";

const Record = ({ peopleArr, setPeopleArr }) => {
  const { loading, error, data } = useQuery(GET_PEOPLE_WITH_CAR);

  useEffect(() => {
    if (data) setPeopleArr(data.people);
  }, [data]);

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Divider>Records</Divider>
      {peopleArr.length > 0 ? (
        peopleArr.map((person) => {
          return <PersonDetail person={person} data={data} key={person.id} />;
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default Record;
