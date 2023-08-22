import { ReadStream } from "fs";
import { s3 } from "../aws";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { Logger } from "./logging";
import env from "../envManager";

const logger = new Logger("FileUtils");

export const uploadImage = async (file: any, keyName: string) => {
  // Convert file stream to buffer inpreparation for AWS upload
  logger.info("Creating read stream and buffer for uploaded image");
  const stream: ReadStream = file.createReadStream();
  const buffer = await streamToBuffer(stream);

  logger.debug(`Uploading image to AWS: ${keyName}`);
  try {
    // First upload the object to AWS
    const uploadParams: PutObjectCommandInput = {
      Bucket: env.AWS_IMAGES_BUCKET as any,
      Key: keyName,
      ContentType: "image",
      Body: buffer,
    };

    const uploadCommand = new PutObjectCommand(uploadParams);
    await s3.send(uploadCommand);
    logger.debug("[AWS] Image uploaded successfully");

    // Then we need to return it's public URL
    return `https://${env.AWS_IMAGES_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${keyName}`;
  } catch (err: any) {
    logger.error(`Error uploading image ${err}`);
    throw Error(`Error uploading to AWS - ${err}`);
  }
};

async function streamToBuffer(stream: ReadStream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf: any[] = [];

    stream.on("data", (chunk) => _buf.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(_buf)));
    stream.on("error", (err) => reject(err));
  });
}
