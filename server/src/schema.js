import db from "../_db.js";
const typeDefs = `#graphql
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
  deletePerson(id: ID!): People
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
  cars: [AddCarInput!],
}
input EditPersonInput{
  firstName: String,
  lastName: String,
}
`;
const resolvers = {
  Query: {
    people: () => db.people,
    person(root, args) {
      return db.people.find((person) => person.id === args.id);
    },
    cars: () => db.cars,
    car(root, args) {
      return db.cars.find((car) => car.id === args.id);
    },
  },
  People: {
    cars(parent) {
      return db.cars.filter((car) => car.personId === parent.id);
    },
  },
  Mutation: {
    addCar(root, args) {
      let car = {
        ...args.car,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.cars.push(car);
      return car;
    },
    deleteCar(root, args) {
      db.cars = db.cars.filter((car) => car.id !== args.id);
      return db.cars;
    },
    updateCar(root, args) {
      db.cars = db.cars.map((car) => {
        if (car.id === args.id) {
          return { ...car, ...args.edits };
        }
        return car;
      });
      return db.cars.find((car) => car.id === args.id);
    },
    addPerson(root, args) {
      let person = {
        ...args.person,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.people.push(person);
      return person;
    },
    deletePerson(root, args) {
      const personToDelete = db.people.find((person) => person.id === args.id);
      if (!personToDelete) {
        throw new Error(`Couldn't find person with id ${args.id}`);
      }
      db.people = db.people.filter((person) => person.id !== args.id);
      return personToDelete;
    },
    updatePerson(root, args) {
      db.people = db.people.map((person) => {
        if (person.id === args.id) {
          return { ...person, ...args.edits };
        }
        return person;
      });
      return db.people.find((person) => person.id === args.id);
    },
  },
};
export { typeDefs, resolvers };
