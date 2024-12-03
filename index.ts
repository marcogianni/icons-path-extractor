import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { camelCase, upperFirst } from "lodash";

const icons = [
  "account-box",
  "account-group-outline",
  "account-outline",
  "alert",
  "alert-circle-outline",
  "alert-octagon",
  "arrow-left",
  "arrow-u-left-top",
  "arrow-up",
  "bank-outline",
  "battery-20",
  "battery-30",
  "bell-outline",
  "block-helper",
  "bottle-soda-classic",
  "bottle-wine",
  "bowl-mix-outline",
  "bullhorn",
  "calendar-outline",
  "calendar-today",
  "car-outline",
  "card-text",
  "cellphone-off",
  "chat",
  "chat-outline",
  "check",
  "check-circle",
  "check-circle-outline",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "circle",
  "clock-outline",
  "clock-time-five-outline",
  "close",
  "cog-outline",
  "content-paste",
  "credit-card-outline",
  "cube",
  "cup",
  "database-off-outline",
  "disc",
  "dishwasher",
  "dog-side",
  "email-search-outline",
  "eye-off-outline",
  "eye-outline",
  "face-man",
  "face-woman",
  "facebook-messenger",
  "file-document-edit-outline",
  "file-document-outline",
  "file-remove-outline",
  "file-sign",
  "floor-plan",
  "frequently-asked-questions",
  "gift-off-outline",
  "glass-fragile",
  "glass-pint-outline",
  "history",
  "home-outline",
  "home-variant-outline",
  "image",
  "information",
  "instagram",
  "key-outline",
  "key-variant",
  "lifebuoy",
  "lightbulb-cel",
  "lightbulb-variant",
  "lightbulb-variant-outline",
  "loading",
  "lock-open",
  "lock-outline",
  "magnify",
  "magnify-scan",
  "map-marker-radius",
  "map-marker-radius-outline",
  "message-plus",
  "microwave",
  "mirror",
  "mirror-variant",
  "minus",
  "newspaper",
  "notebook",
  "notebook-outline",
  "oil",
  "open-in-new",
  "palette",
  "passport",
  "pencil",
  "pill",
  "playlist-check",
  "plus",
  "pot-mix-outline",
  "razor-single-edge",
  "receipt-text",
  "recycle-variant",
  "repeat",
  "shield-account",
  "shield-key-outline",
  "shield-outline",
  "shower",
  "smoking",
  "spray",
  "stove",
  "teddy-bear",
  "test-tube-empty",
  "ticket-confirmation",
  "trash-can-outline",
  "tray",
  "tune-variant",
  "umbrella",
  "wallet-bifold-outline",
  "weather-night",
  "whatsapp",
  "white-balance-sunny",
  "wrench-outline",
  "menu-down",
  "dots-horizontal",
  "dots-vertical",
  "home-city-outline",
  "map-outline",
  "chevron-double-right",
  "chevron-double-left",
  "filter-variant",
  "pencil-outline",
  "drag-vertical",
  "delete-outline",
  "information-outline",
  "timer-sand",
  "calendar-month-outline",
  "inbox-outline",
  "autorenew",
  "lock",
  "wifi",
  "tools",
  "handshake-outline",
  "heart",
  "vacuum",
  "smoking-off",
  "sprout",
  "volume-mute",
  "door",
  "account",
  "share-variant-outline",
];

main(icons.sort());

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

      const camelCasedIcon = upperFirst(camelCase(icon));
      const output = `export const mdi${camelCasedIcon} = '${extractedString}';\n`;
      writeFileSync(fileToWrite, output, { flag: "a" });

      return { [`mdi${camelCasedIcon}`]: extractedString };
    } catch (error) {
      console.error(`File not found: ${icon}`);
      return null;
    }
  });

  console.debug(searchedFiles);
}
