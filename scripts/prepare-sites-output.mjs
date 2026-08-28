import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const distDirectory = resolve("dist");
const serverDirectory = resolve(distDirectory, "server");
const metadataDirectory = resolve(distDirectory, ".openai");

mkdirSync(serverDirectory, { recursive: true });
mkdirSync(metadataDirectory, { recursive: true });

copyFileSync(resolve("worker/index.js"), resolve(serverDirectory, "index.js"));
copyFileSync(
  resolve(".openai/hosting.json"),
  resolve(metadataDirectory, "hosting.json"),
);
