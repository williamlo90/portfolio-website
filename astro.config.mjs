import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const site = process.env.SITE_URL;

export default defineConfig({
  output: "static",
  site,
  build: {
    inlineStylesheets: "always",
  },
  integrations: site ? [sitemap()] : [],
});
