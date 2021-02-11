module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/static/img");
  eleventyConfig.addPassthroughCopy("src/static/uploads");
  eleventyConfig.addPassthroughCopy("src/static/css");

  eleventyConfig.addCollection("pages", function (collection) {
    console.log({ items: collection.items });
    return collection.getAllSorted();
  });

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };
  let opts = {
    permalink: false,
  };

  eleventyConfig.setLibrary(
    "md",
    markdownIt(options).use(markdownItAnchor, opts)
  );

  // Liquid Options
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true,
  });

  const md = markdownIt();

  eleventyConfig.addLiquidFilter("md", function (value) {
    return md.render(value);
  });

  return {
    templateFormats: ["md", "html", "liquid"],

    pathPrefix: "/",

    markdownTemplateEngine: "liquid",

    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
