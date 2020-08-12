import { User } from "../../models";
import bcrypt from "bcryptjs";
import { generateToken, getAuthUser } from "../../Auth/auth";
import { validateRegister, validateLogin } from "../../validators";
import { AuthenticationError } from "apollo-server-express";
export default {
  Query: {
    profile: async (_, args, { isAuth, userId }) => {
      console.log(isAuth);
      if (!isAuth) {
        throw new AuthenticationError(" not authorized");
      }
      let user = await User.findById(userId);
      return user;
    },
    users: async (_, args, { isAuth, userId }) => {
      if (!isAuth) {
        throw new AuthenticationError(" not authorized");
      }
      let user = await User.findById(userId);
      if (user.admin === 0) {
        throw new AuthenticationError(" not authorized");
      } else {
        let users = await User.find();
        return users;
      }
    },
    // Login logic
    login: async (_, args) => {
      // validate user information with validator.js
      try {
        await validateLogin.validate(args);
      } catch (err) {
        throw new Error("invalid credentials");
      }
      // check if user exists
      let user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error("user doesn't exist");
      }
      // if password is correct
      const isMatched = await bcrypt.compare(args.password, user.password);
      if (!isMatched) {
        throw new Error("invalid password");
      }
      // get token
      let token = await generateToken(user);
      return {
        user,
        token,
      };
    },
  },

  Mutation: {
    // the logic for registering user
    register: async (_, args) => {
      // validate user information with validator.js
      try {
        await validateRegister.validate(args);
      } catch (err) {
        throw new Error("invalid credentials");
      }

      // check if user already exists in the database
      let user = await User.findOne({ email: args.email });
      if (user) {
        throw new Error("user already exists");
      }
      // create new user
      args.password = await bcrypt.hash(args.password, 10);
      let newUser = await User.create(args);
      let token = await generateToken(newUser);
      return {
        user: newUser,
        token,
      };
    },
  },
};
