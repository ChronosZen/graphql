import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
// import express from "express";
// import http from "http";
// import cors from "cors";
import db from "./_db.js";

import { typeDefs } from "./src/schema.js";
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
      db.people = db.people.filter((person) => person.id !== args.id);
      return db.people;
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
// // Passing an ApolloServer instance to the `startStandaloneServer` function:
// //  1. creates an Express app
// //  2. installs your ApolloServer instance as middleware
// //  3. prepares your app to handle incoming requests
// const startApolloServer = async () => {
//   const app = express();

//   const httpServer = http.createServer(app);
//   // The ApolloServer constructor requires two parameters: your schema
//   // definition and your set of resolvers.
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//   });

//   await server.start();
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//   });

//   console.log(`🚀  Server ready at: ${url}`);
// };
// startApolloServer();
