import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { camelCase } from "lodash";

const icons = ["loading", "account-badge"];

main(icons);

function main(icons: string[]) {
  const fileToWrite = "./output.ts";

  try {
    unlinkSync(fileToWrite);
  } catch (error) {
    // Ignore error if the file doesn't exist
  }

  const searchedFiles = icons.map((icon) => {
    try {
      const file = readFileSync(`./icons/${icon}.svg`, "utf8");
      const svgPath = file.match(/<path.*\/>/g);
      const extractedString = svgPath?.[0]
        .replace(/<path d="/, "")
        .replace(/" \/>/, "");

      const output = `export const ${camelCase(
        icon.replace(/-/g, "")
      )} = '${extractedString}';\n`;
      writeFileSync(fileToWrite, output, { flag: "a" });

      return { [`mdi${camelCase(icon)}`]: extractedString };
    } catch (error) {
      console.error(`File not found: ${icon}`);
      return null;
    }
  });

  console.debug(searchedFiles);
}
