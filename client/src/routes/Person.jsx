import React from "react";
import { useParams } from "react-router";
import { GET_PERSON_ID } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import PersonDetail from "../components/PersonDetail";
import EditModal from "../components/EditPerson";
const Person = () => {
  let { id } = useParams();

  const { loading, error, data } = useQuery(GET_PERSON_ID, {
    variables: { id },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <PersonDetail
        person={data.person}
        data={data}
        key={data.person.id}
        detailFlag={false}
      />
      <EditModal />
    </>
  );
};

export default Person;
