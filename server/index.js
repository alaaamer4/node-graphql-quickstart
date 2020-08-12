import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { getAuthUser } from "./Auth/auth";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import config from "./config/key";

//start the server
const server = async () => {
  // init the app
  const app = express();

  app.use(getAuthUser);
  //apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground:
      process.env.NODE_ENV === "production"
        ? false
        : {
            settings: {
              "request.credentials": "include",
            },
          },
    context: ({ req }) => {
      return req;
    },
  });

  app.listen(config.PORT, () => {
    console.log(
      `app running on port ${config.PORT} you can test your queries on http://localhost:${config.PORT}/graphql`
    );
  });

  // ** MIDDLEWARE ** //
  server.applyMiddleware({ app });
  // db connection
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongo DB ");
  } catch (err) {
    throw err;
  }
};

server();
