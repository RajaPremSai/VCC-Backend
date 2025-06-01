const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

// Create S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;

module.exports = { s3Client, S3_BUCKET };
