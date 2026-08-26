const prettier = require("prettier");
const fs = require("fs");

const css = fs.readFileSync("dist/assets/index-Dy2eI0DK.css", "utf8");
prettier.format(css, { parser: "css" }).then(formatted => {
  fs.writeFileSync("src/style.css", formatted);
  console.log("Formatted and wrote to src/style.css");
});
