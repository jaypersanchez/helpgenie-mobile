module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@Navigations": "./src/navigation",
            "@Components": "./src/components",
            "@Screens": "./src/screens",
            "@Assets": "./assets",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
