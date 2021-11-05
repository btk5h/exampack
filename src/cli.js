import sade from "sade";
import { version } from "../package.json";
import { startServer } from "./server";

const prog = sade("exampack");

prog.version(version);

prog
  .command("start")
  .describe("Starts the exampack server")
  .action(startServer);

export function cli(argv) {
  prog.parse(argv);
}