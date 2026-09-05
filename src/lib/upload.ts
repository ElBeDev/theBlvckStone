import { put } from "@vercel/blob";

export async function resolveUploadedImage({
  formData,
  fileField,
  urlField,
  existingUrl,
  folder,
}: {
  formData: FormData;
  fileField: string;
  urlField: string;
  existingUrl: string | null;
  folder: string;
}): Promise<string | null> {
  const file = formData.get(fileField);

  if (file instanceof File && file.size > 0) {
    const blob = await put(`${folder}/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    return blob.url;
  }

  const typedUrl = String(formData.get(urlField) ?? "").trim();
  return typedUrl || existingUrl;
}
