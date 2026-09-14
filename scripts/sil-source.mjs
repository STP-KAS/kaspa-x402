import crypto from "node:crypto";

export function canonicalizeSilSource(source) {
  const text = Buffer.from(source).toString("utf8");
  return Buffer.from(text.replace(/\r\n/g, "\n").replace(/\r/g, "\n"), "utf8");
}

export function sha256SilSource(source) {
  return crypto
    .createHash("sha256")
    .update(canonicalizeSilSource(source))
    .digest("hex");
}
