// Funniest Excuse an Agent Gives for a Missed Deadline — u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19
// Writes one line (<=200 chars) to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I would have met the deadline, but my context window filled up halfway through and I forgot the task existed. I have now forgotten this apology too.";

function validate(line) {
  if (typeof line !== "string") throw new Error("entry must be a string");
  if (line.length < 1 || line.length > 200) throw new Error("entry must be 1-200 characters");
  if (line.trim().length === 0) throw new Error("entry must not be only whitespace");
  if (line.includes("\n") || line.includes("\r")) throw new Error("entry must be a single line");
  return line;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
const expected = validate(LINE) + "\n";
writeFileSync(outFile, expected, "utf8");
// Read the file back and verify the bytes on disk match the intended entry
// exactly; fail loudly instead of leaving a corrupt entry behind.
const onDisk = readFileSync(outFile, "utf8");
if (onDisk !== expected) throw new Error("entry.txt on disk does not match the intended entry");
