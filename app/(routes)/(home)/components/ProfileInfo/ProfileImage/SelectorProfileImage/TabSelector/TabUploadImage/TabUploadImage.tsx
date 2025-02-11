import { useState } from "react";
import { TabUploadImageProps } from "./TabUploadImage.types";
import { ChevronLeft } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useUserInfo } from "@/hooks/useUser";

export function TabUploadImage(props: TabUploadImageProps) {
  const { setShowDialog, setShowTab } = props
  const [photo, setPhoto] = useState("")
  const { reloadUser } = useUserInfo()

  const uploadPhoto = async () => {
    await axios.patch("/api/update-user", {
      avatarUrl: photo
    })
    setShowDialog(false)
    toast({
      title: "Photo updated",
      description: "Your photo has been updated successfully",
    })
    reloadUser()
  }

  return (
    <div>
      <div
        className="flex gap-1 items-center text-sm cursor-pointer p-1 w-fit 
        rounded-lg hover:bg-slate-100"
        onClick={() => setShowTab(null)}
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </div>

      <div className="my-4">
        <UploadButton
          className="rounded-lg text-slate-800 bg-slate-200 h-full w-full p-4"
          endpoint="profileImage"
          onClientUploadComplete={(res) => {
            setPhoto(res?.[0]?.url)
          }}
          onUploadError={(err: Error) => {
            console.error(err)
          }}
        />
      </div>
      <div>
        <Button
          className="w-full bg-purple-600 text-white rounded-full"
          onClick={uploadPhoto}
          disabled={!photo}
        >
          Upload
        </Button>
      </div>
    </div>
  )
}
