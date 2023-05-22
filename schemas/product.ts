import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Produkt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nazwa",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "mainImage",
      title: "Zdjęcie główne",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "extraPhotos",
      title: "Zdjęcia dodatkowe",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "category",
      title: "Kategoria",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Cena",
      type: "number",
    }),
    defineField({
      name: "newPrice",
      title: "Nowa cena (przecena)",
      type: "number",
      description: "(Opcjonalne)",
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "string",
      description: "Krótki i opis produktu",
    }),
    defineField({
      name: "body",
      title: "Opis produktu",
      type: "blockContent",
      description: "Obszerny opis produktu",
    }),
    defineField({
      name: "packageSize",
      title: "Ilość w opakowaniu(g)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "availability",
      title: "Dostępność",
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
