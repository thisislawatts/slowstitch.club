const Image = require("@11ty/eleventy-img");
const CleanCSS = require('clean-css');

async function imageShortcode(src, alt = "", sizes) {
  let metadata = await Image(`.${src}`, {
    widths: [360, 650, 800],
    formats: ["webp", "jpeg"],
    outputDir: "_site/img",
  });

  return Image.generateHTML(metadata, {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  });
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/static/img");
  eleventyConfig.addPassthroughCopy("src/static/uploads");
  eleventyConfig.addPassthroughCopy("src/static/css");

  eleventyConfig.addCollection("pages", function (collection) {
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

  // Extend liquid

  const md = markdownIt();
  eleventyConfig.addLiquidFilter("md", function (value) {
    return md.render(value);
  });

  eleventyConfig.addLiquidFilter('cssmin', (styles) => new CleanCSS({}).minify(styles).styles)

  eleventyConfig.addLiquidShortcode("image", imageShortcode);

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
