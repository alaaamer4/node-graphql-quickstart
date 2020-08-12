import { gql } from "apollo-server-express";

export default gql`
  type Query {
    profile: User!
    users: [User!]!
    login(email: String!, password: String!): Auth
  }
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
  type Auth {
    user: User!
    token: String!
  }
  type Mutation {
    register(name: String!, email: String!, password: String!): Auth!
  }
`;
