import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    _: String
  }

  extend type Mutation {
    _: String
  }
`;
