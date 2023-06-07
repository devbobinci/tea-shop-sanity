import { defineField, defineType } from "sanity";

export default {
  name: "comment",
  type: "document",
  title: "Komentarze",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Komentarz",
    },
    {
      name: "approved",
      type: "boolean",
      title: "Zatwierdzony",
      description: "Komentarz nie bedzie widoczny bez zatwierdzenia",
    },
    { name: "email", type: "string" },
    { name: "comment", type: "text" },
    { name: "post", type: "reference", to: [{ type: "post" }] },
  ],
};
