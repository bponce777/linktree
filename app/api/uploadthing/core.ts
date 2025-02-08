import { createUploadthing } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
  return {}
}

export const OurFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profileImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
} satisfies FileRouter;
export type OurFileRouter = typeof OurFileRouter;
