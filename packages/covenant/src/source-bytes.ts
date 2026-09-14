import crypto from "node:crypto";

/** Launch-identity source is LF bytes. Windows checkouts may still be CRLF. */
export function canonicalizeSilSource(source: string | Uint8Array): Buffer {
  const text =
    typeof source === "string"
      ? source
      : Buffer.from(source).toString("utf8");
  return Buffer.from(text.replace(/\r\n/g, "\n").replace(/\r/g, "\n"), "utf8");
}

export function sha256SilSource(source: string | Uint8Array): string {
  return crypto
    .createHash("sha256")
    .update(canonicalizeSilSource(source))
    .digest("hex");
}
