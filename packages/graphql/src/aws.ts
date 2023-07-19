import { S3Client } from "@aws-sdk/client-s3";

// Initialise AWS S3
export const s3 = new S3Client({
    region: process.env.S3_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY || '',
        secretAccessKey: process.env.AWS_SECRET || ''
    }
});