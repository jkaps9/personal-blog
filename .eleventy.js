import path from "node:path";
import * as sass from "sass";
import { DateTime } from "luxon";
import posts from "./src/_data/posts.json" with { type: "json" };

export default function (config) {
  // add SCSS template format
  config.addTemplateFormats("scss");

  config.addPassthroughCopy("./src/main.js");

  // Set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/assets");
  //config.addPassthroughCopy("./src/admin"); // Needed for DecapCMS

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
    return DateTime.fromISO(dateObj, { zone: "utc" }).toLocaleString(
      DateTime.DATE_FULL,
    );
  });

  // create a posts collection

  config.addCollection("allPosts", function (collectionApi) {
    return posts.sort((a, b) => {
      return DateTime.fromISO(b.date) - DateTime.fromISO(a.date);
    });
  });

  config.addCollection("latestPosts", function (collectionApi) {
    return posts
      .sort((a, b) => DateTime.fromISO(b.date) - DateTime.fromISO(a.date))
      .slice(0, 5);
  });

  return {
    pathPrefix: "/personal-blog/",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
