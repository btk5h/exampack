import path from "node:path";
import fs from "fs-extra";

// tech debt: this code assumes the base url will refer to /dist/cli.js due to our build step
// if possible, find a better way to reference the assets folder
const baseUrl = import.meta.url;
const assetsUrl = new URL("../assets", baseUrl);

export async function copyAssets() {
  await fs.copy(assetsUrl.pathname, path.resolve(".exampack"));
}

export async function readAsset(assetName) {
  return fs.readFile(path.resolve(".exampack", assetName), "utf-8");
}