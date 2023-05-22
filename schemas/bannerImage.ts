import { defineField, defineType } from "sanity";

export default defineType({
  name: "bannerImage",
  title: "Baner",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł (widoczny tylko tutaj)",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Zdjęcie",
      type: "image",
    }),
    defineField({
      name: "current",
      title: "Widoczność (upewnij się, ze inny jest zatwierdzony)",
      type: "boolean",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
