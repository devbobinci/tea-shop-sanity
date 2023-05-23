import { buildLegacyTheme } from "sanity";

const props = {
  "--my-beige": "#e2ad78",
  "--my-gray": "#c0c0c0",
  "--my-m-gray": "#888",
  "--my-d-gray": "#444",
  "--my-bg": "#fffbf7",
  "--my-yellow": "#FACD22",
  "--my-red": "#DE5052",
  "--my-black": "#1a1a1a",
  "--my-white": "#fff",
  "--my-green": "#0f9d58",
};

export const myTheme = buildLegacyTheme({
  // Base theme colors
  "--black": props["--my-black"],
  "--white": props["--my-white"],

  "--gray": "#666",
  "--gray-base": "#666",

  "--component-bg": props["--my-black"],
  "--component-text-color": props["--my-white"],

  // Brand
  "--brand-primary": props["--my-beige"],

  // Default button
  "--default-button-color": "#666",
  "--default-button-primary-color": props["--my-beige"],
  "--default-button-success-color": props["--my-green"],
  "--default-button-warning-color": props["--my-beige"],
  "--default-button-danger-color": props["--my-red"],

  // State
  "--state-info-color": props["--my-beige"],
  "--state-success-color": props["--my-green"],
  "--state-warning-color": props["--my-beige"],
  "--state-danger-color": props["--my-red"],

  // Navbar
  "--main-navigation-color": props["--my-black"],
  "--main-navigation-color--inverted": props["--my-white"],

  "--focus-color": props["--my-beige"],
});
