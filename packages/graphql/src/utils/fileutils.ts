import {s3} from "../aws"

const IMAGES_BUCKET = "bouldermate-images"

export const uploadImage = (filePath: string, keyName: string) => {
  return new Promise((resolve, reject) => {
    try {
      var fs = require('fs');
      const file = fs.readFileSync(filePath);
      const BUCKET = IMAGES_BUCKET;
      
      const uploadParams = {
        Bucket: BUCKET,
        Key: keyName,
        Body: file
      };
      
      s3.upload(uploadParams, function (err: any, data: any) {
        if (err) return reject(err);
        if (data) return resolve(data);
      });
    } catch (err) {
      return reject(err);
    }
  })
}
