const express = require('express');
const axios = require('axios');
const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    helloMicroservice: String
    helloSelf: String
  }
`;

// Provide resolver functions for your schema fields 1
const resolvers = {
  Query: {
    helloMicroservice: async () => {
      // Returns it from other microservice
      const res = await axios.get('http://localhost:3000');
      return res.data;
    },
    helloSelf: async () => {
      return 'Hello World!';
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
