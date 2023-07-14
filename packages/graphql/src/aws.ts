const {
    S3
} = require("@aws-sdk/client-s3");

// Initialise AWS S3
export const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
});

// Initialise images bucket