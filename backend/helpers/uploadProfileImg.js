import { cloudinary } from "../config/cloudinary.config.js";

const uplaodProfileImg = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          eager: [{ width: 300, height: 300, crop: "thumb", gravity: "face" }],
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Error:", error);
            reject({
              success: false,
              message: "Error uploading to Cloudinary",
            });
          }
          // console.log("Cloudinary Result:", result);
          resolve({ success: true, result });
        }
      )
      .end(file.buffer);
  });
};

export { uplaodProfileImg };
