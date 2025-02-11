import { useUserInfo } from "@/hooks/useUser";
import { EditBackgroundProps } from "./EditBackground.types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, ImagePlus } from "lucide-react";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";


export function EditBackground(props: EditBackgroundProps) {
  const { onReload } = props;
  const [showDialog, setShowDialog] = useState(false)
  const [photoUrl, setphotoUrl] = useState("")
  const { reloadUser } = useUserInfo();

  const onChangeBackground = async () => {
    await axios.patch("/api/update-user", {
      backgroundImage: photoUrl
    })
    setShowDialog(false)
    reloadUser()
    onReload(true)
    toast({
      title: "Background updated",
      description: "Your background has been updated successfully",
    })
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="p-2 bg-[#e0e2d9] rounded-full">
            <Ellipsis fill="black" strokeWidth={1} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <DialogTrigger>
              <div className="flex gap-1 items-center">
                <ImagePlus className="w-4 h-4" />
                Edit or add background
              </div>
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Background</DialogTitle>
          <div className="my-4">
            {photoUrl ? (
              <div>
                <Image src={photoUrl} alt="profile" width={300} height={300} />
              </div>
            ) : (
              <UploadButton
                className="rounded-md text-slate-800 bg-slate-200 h-full py-10"
                endpoint="profileImage"
                onClientUploadComplete={(res) => {
                  setphotoUrl(res?.[0]?.url)
                }}
                onUploadError={(error: Error) => {
                  console.log(error)
                }}
              />
            )}
          </div>
          <Button className="w-full rounded-full bg-violet-500"
            disabled={!photoUrl}
            onClick={onChangeBackground}
          >Change Background</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
