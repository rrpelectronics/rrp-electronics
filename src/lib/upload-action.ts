"use server";
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary connection configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadAsset(formData: FormData, folder: string = "uploads") {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file found in submission");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload buffer directly to Cloudinary via upload_stream
    const url = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folder, resource_type: "auto" },
        (error, result) => {
          if (error) {
             reject(error);
          } else if (result?.secure_url) {
             resolve(result.secure_url);
          } else {
             reject(new Error("Unknown error during upload"));
          }
        }
      );
      uploadStream.end(buffer);
    });

    return { url };
  } catch (error: any) {
    console.error("Cloudinary Server Upload Error:", error);
    throw new Error(error.message || "Failed to upload file to Cloudinary");
  }
}
