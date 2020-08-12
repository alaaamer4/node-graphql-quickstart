import jwt from "jsonwebtoken";
import config from "../config/key";

export const generateToken = async ({ email, id }) => {
  let token = await jwt.sign({ email, id }, config.jwtSecret, {
    expiresIn: "2h",
  });

  return token;
};

//?            ** EXPRESS MIDDLEWARE FOR PROTECTED ROUTES **         //

export const getAuthUser = async (req, res, next) => {
  // check the header for authorization token
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    // if not authorized we set auth to not authorized
    req.isAuth = false;
    return next();
  }
  let token;
  try {
    // check if token is valid
    token = await jwt.verify(authHeader, config.jwtSecret);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!token) {
    req.auth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = token.id;
  next();
};
