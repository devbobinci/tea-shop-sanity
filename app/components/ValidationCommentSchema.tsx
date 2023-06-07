"use client";

import * as Yup from "yup";

export default function ValidationCommentSchema() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email jest wymagany")
      .email("Niepoprawny email"),
    name: Yup.string()
      .required("Email jest wymagany")
      .min(3, "Conajmniej 3 znaki"),
    comment: Yup.string().required("Komentarz jest wymagany"),
  });

  return validationSchema;
}
