import path from "node:path";
import * as sass from "sass";
import { DateTime } from "luxon";

export default function (config) {
  // add SCSS template format
  config.addTemplateFormats("scss");

  config.addPassthroughCopy("./src/main.js");

  // Set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/assets");
  config.addPassthroughCopy("./src/admin"); // Needed for DecapCMS

  // Configure SCSS files
  config.addExtension("scss", {
    outputFileExtension: "css",

    // opt-out of Eleventy Layouts
    useLayouts: false,

    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      // Don’t compile file names that start with an underscore
      if (parsed.name.startsWith("_")) {
        return;
      }

      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
      });

      // Map dependencies for incremental builds
      this.addDependencies(inputPath, result.loadedUrls);

      return async (data) => {
        return result.css;
      };
    },
  });

  config.addWatchTarget("./src/scss/");

  // add date filter
  config.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
  });

  // create a posts collection

  config.addCollection("posts", function (collection) {
    return collection.getFilteredByGlob("src/posts/**/*.md").sort((a, b) => {
      return DateTime.fromJSDate(b.date) - DateTime.fromJSDate(a.date);
    });
  });

  config.addCollection("latestPosts", function (collection) {
    return collection
      .getFilteredByGlob("src/posts/**/*.md")
      .sort((a, b) => DateTime.fromJSDate(b.date) - DateTime.fromJSDate(a.date))
      .slice(0, 5);
  });

  return {
    pathPrefix: process.env.NODE_ENV === "production" ? "/personal-blog/" : "/",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
