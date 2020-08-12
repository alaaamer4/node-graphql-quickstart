import * as yup from "yup";

export const validateRegister = yup.object().shape({
  name: yup
    .string()
    .min(5, "username is too short")
    .max(35, "username is too long")
    .required("username is required"),
  email: yup.string().email("invalid email").required("email is required"),
  password: yup
    .string()
    .min(6, "password is too short")
    .required("password is required"),
});

export const validateLogin = yup.object().shape({
  email: yup.string().email("invalid email").required("email is required"),
  password: yup
    .string()
    .min(6, "password is too short")
    .required("password is required"),
});
