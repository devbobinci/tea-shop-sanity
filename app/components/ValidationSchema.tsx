"use client";

import YupPassword from "yup-password";
import * as Yup from "yup";

export default function ValidationSchema() {
  YupPassword(Yup);

  let validationSchema;
  validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email jest wymagany")
      .email("Niepoprawny email"),
    password: Yup.string()
      .required("Hasło jest wymagane")
      .min(8, "Hasło conajmniej 8 znaków")
      .minLowercase(1, "Przynajmiej 1 mała litera")
      .minUppercase(1, "Przynajmiej 1 wielka litera")
      .minNumbers(1, "Przynajmiej 1 mała cyfra")
      .minSymbols(1, "Przynajmiej 1 znak specjalny"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Hasła muszą się zgadzać")
      .required("Potwierdź hasło"),
  });

  return validationSchema;
}
