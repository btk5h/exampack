import fs from "node:fs";
import path from "node:path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

function loadLayouts() {
  return Object.fromEntries(
    fs
      .readdirSync('./layouts')
      .map((file) => [path.parse(file).name, `./layouts/${file}`])
  );
}

export function generateViteConfig() {
  const layout = loadLayouts();
  return (
    {
      configFile: false,
      server: {
        middlewareMode: "ssr"
      },
      plugins: [
        svelte({
          extensions: [".svelte", ".svx"],
          preprocess: mdsvex({ layout })
        })
      ]
    }
  );
}