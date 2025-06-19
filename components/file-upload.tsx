"use client";

import toast from "react-hot-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string, originalFilename?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({
  onChange,
  endpoint,
}: FileUploadProps) => {
  return (
    <div className="border border-dashed border-gray-300 dark:border-gray-600 p-4 rounded-md bg-white dark:bg-gray-900">
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          console.log("Upload complete:", res);
          if (res && res.length > 0) {
            const file = res[0];
            const fileUrl = file?.url || file?.ufsUrl; // depends on your UploadThing version
            const originalName = file?.name;

            if (fileUrl && originalName) {
              onChange(fileUrl, originalName);
            }
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message || "Upload failed");
        }}
      />
    </div>
  );
};
