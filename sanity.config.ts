import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { myTheme } from "./theme";
import Logo from "@/app/components/studio/Logo";
import StudioNavbar from "@/app/components/studio/StudioNavbar";

export default defineConfig({
  basePath: "/studio",
  name: "TeaShop",
  title: "tea-shop",

  projectId: "chgfofvz",
  dataset: "production",

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      logo: Logo,
      navbar: StudioNavbar,
    },
  },

  theme: myTheme,
});
