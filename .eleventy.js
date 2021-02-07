module.exports = (eleventyconfig) => {
  eleventyconfig.addPassthroughCopy("src/img");
  eleventyconfig.addPassthroughCopy("src/admin");
  eleventyconfig.addPassthroughCopy("src/uploads");

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
