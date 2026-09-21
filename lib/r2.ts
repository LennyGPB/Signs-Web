import { S3Client } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

if (!accountId || !accessKeyId || !secretAccessKey) {
  throw new Error("Missing R2_ACCOUNT_ID, R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY environment variable");
}

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
});

export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME ?? "signs";

export const EBOOK_OBJECT_KEYS = {
  fr: "ebook/ebook_francais.pdf",
  en: "ebook/ebook_english.pdf",
} as const;

export type EbookLang = keyof typeof EBOOK_OBJECT_KEYS;
