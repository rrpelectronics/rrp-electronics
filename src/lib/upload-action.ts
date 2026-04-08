"use server";
import { put } from '@vercel/blob';

/**
 * Upload a file to Vercel Blob storage.
 * Replaces the previous Cloudinary upload.
 * 
 * @param formData - FormData containing a "file" field
 * @param folder - Optional folder prefix for organization
 * @returns Object with the public URL of the uploaded file
 */
export async function uploadAsset(formData: FormData, folder: string = "uploads") {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file found in submission");

    // Create a clean filename with folder prefix
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const pathname = `${folder}/${timestamp}-${safeName}`;

    // Upload to Vercel Blob
    const blob = await put(pathname, file, {
      access: 'public',
    });

    return { url: blob.url };
  } catch (error: any) {
    console.error("Vercel Blob Upload Error:", error);
    throw new Error(error.message || "Failed to upload file to Vercel Blob");
  }
}
