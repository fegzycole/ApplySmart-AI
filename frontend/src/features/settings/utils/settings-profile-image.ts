const MAX_PROFILE_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;

export function validateProfileImage(file: File) {
  if (!file.type.startsWith("image/")) {
    return "Profile photo must be an image.";
  }

  if (file.size > MAX_PROFILE_IMAGE_SIZE_BYTES) {
    return "Profile photo must be 2MB or smaller.";
  }

  return null;
}
