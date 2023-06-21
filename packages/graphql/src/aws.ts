const AWS = require('aws-sdk');

// Initialise AWS S3
export const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
});

// Initialise images bucket