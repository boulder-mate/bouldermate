import { ReadStream } from "fs"
import {s3} from "../aws"
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3"

export const uploadImage = async (file: any, keyName: string) => {
  // Convert file stream to buffer inpreparation for AWS upload
  console.log("Creating read stream and buffer for uploaded image")
  const stream: ReadStream = file.createReadStream()
  const buffer = await streamToBuffer(stream)

  console.log("[AWS] Uploading image to AWS:", keyName)
    try {
      // First upload the object to AWS
      const uploadParams: PutObjectCommandInput = {
        Bucket: process.env.S3_BUCKET,
        Key: keyName,
        ContentType: "image",
        Body: buffer,
      };
      
      const uploadCommand = new PutObjectCommand(uploadParams)
      await s3.send(uploadCommand);
      console.log("[AWS] Image uploaded successfully")

      // Then we need to return it's public URL
      return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${keyName}`
      
    } catch (err: any) {
      console.log("[AWS] Error uploading image", err)
      throw Error(`Error uploading to AWS - ${err}`);
    }
  }

  async function streamToBuffer(stream: ReadStream): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const _buf: any[] = [];
  
      stream.on('data', (chunk) => _buf.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(_buf)));
      stream.on('error', (err) => reject(err));
    });
  }
