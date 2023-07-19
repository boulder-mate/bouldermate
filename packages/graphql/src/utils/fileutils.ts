import {s3} from "../aws"
import 

const IMAGES_BUCKET = "bouldermate-images"

export const uploadImage = async (filePath: string, keyName: string) => {
  console.log("[AWS] Uploading image to AWS:", keyName)
    try {
      var fs = require('fs');
      const file = fs.readFileSync(filePath);
      const BUCKET = IMAGES_BUCKET;
      
      const uploadParams = {
        Bucket: BUCKET,
        Key: keyName,
        Body: file
      };
      
      await s3.upload(uploadParams, function (err: any, data: any) {
        if (err) throw err;
        if (data) return data;
      });
      console.log("[AWS] Image uploaded successfully")
    } catch (err: any) {
      throw Error(`Error uploading to AWS ${err}`);
    }
  }
