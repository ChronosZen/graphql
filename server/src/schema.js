export const typeDefs = `#graphql
 type People{
  id: ID!,
  firstName: String!,
  lastName: String!,
  cars: [Car!]
 }
type Car{
  id: ID!
  year: Int!,
  make: String!,
  model: String!,
  price: Float!,
  personId: ID!,
  
}
type Query{
  people: [People]
  person(id: ID!): People
  cars: [Car]
  car(id: ID!): Car
  }
type Mutation{
  addPerson(person: AddPersonInput!): People
  deletePerson(id: ID!): [People]
  updatePerson(id:ID!, edits: EditPersonInput!): People
  addCar(car: AddCarInput!): Car
  deleteCar(id: ID!): [Car]
  updateCar(id:ID!, edits: EditCarInput!): Car
}
input AddCarInput{
  year: Int!,
  make: String!,
  model: String!,
  price: Float!,
  personId: ID!,
}
input EditCarInput{
  year: Int,
  make: String,
  model: String,
  price: Float,
}
input AddPersonInput{
  firstName: String!,
  lastName: String!,
}
input EditPersonInput{
  firstName: String,
  lastName: String,
}
`;
