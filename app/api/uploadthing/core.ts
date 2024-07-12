import { auth } from "@/auth";

import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await auth()
  const userId = session?.user?.id as string;
  if (!userId) throw new Error("Unauthorized");
  return { userId }
}

export const ourFileRouter = {

  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
