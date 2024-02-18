import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
    }
  }
`;
export const GET_PEOPLE_WITH_CAR = gql`
  {
    people {
      id
      firstName
      lastName
      cars {
        id
        year
        price
        make
        model
        personId
      }
    }
  }
`;
export const GET_PERSON_ID = gql`
  query getPerson($id: ID!) {
    person(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
      }
    }
  }
`;

export const ADD_PERSON = gql`
  mutation AddPerson($person: AddPersonInput!) {
    addPerson(person: $person) {
      id
      firstName
      lastName
    }
  }
`;
export const DELETE_PERSON = gql`
  mutation DeletePerson($id: ID!) {
    deletePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;
export const GET_CARS = gql`
  {
    cars {
      id
      year
      model
      make
      price
      personId
    }
  }
`;
export const ADD_CAR = gql`
  mutation AddCarMutation($car: AddCarInput!) {
    addCar(car: $car) {
      id
      model
      make
      year
      price
      personId
    }
  }
`;
export const DELETE_CAR = gql`
  mutation DeleteCar($id: ID!) {
    deleteCar(id: $id) {
      id
      year
      model
      make
      price
      personId
    }
  }
`;
