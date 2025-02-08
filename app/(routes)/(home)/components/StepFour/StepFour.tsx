import Image from "next/image";
import { dataStepFourImages } from "./StepFour.data";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/uploadthing";
import { Plus } from "lucide-react";
import { useStepConfig } from "@/hooks/useStepConfig";
import { toast } from "@/hooks/use-toast";
import axios from "axios"

export function StepFour() {
  const [name, setname] = useState("")
  const [username, setusername] = useState("")
  const [photoUrl, setphotoUrl] = useState("")
  const [showUploadPhoto, setshowUploadPhoto] = useState(false)
  const [selectedPhoto, setselectedPhoto] = useState("")
  const { setInfoUser, nextStep, infoUser } = useStepConfig()

  const handleImageSelect = (src: string) => {
    setselectedPhoto(src)
    setInfoUser((prevInfoUser) => ({
      ...prevInfoUser,
      avatarUrl: src
    }))
  }

  const hanndleContinue = async () => {
    if (!name || !username) {
      alert("Please fill all the fields")
      return
    }

    setInfoUser((prevInfoUser) => ({
      ...prevInfoUser,
      name,
      username,
    }))
    try {
      const response = await axios.post("/api/user", {
        name: name,
        username: username,
        avatarUrl: infoUser.avatarUrl,
        link: infoUser.platforms,
        typeUser: infoUser.typeUser,
      });
      if (response.status === 200) {
        nextStep()
      }
    } catch (error) {
      toast({ title: "this user already exist" })
      console.error(error)
    }
  }

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">Add profile details</h2>
      <p className="text-center">Select your profile image or upload it</p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-4 items-center">
        {dataStepFourImages.map(({ src }) => (
          <div
            key={src}
            className={`flex flex-col items-center gap-2 p-1 rounded-full
            text-white transition-all duration-300 cursor-pointee
             ${selectedPhoto === src ? "bg-violet-500" : "bg-violet-300"}
            `}
            onClick={() => handleImageSelect(src)}
          >
            <Image
              src={src}
              alt="profile"
              width={40}
              height={40}
              className="w-full rounded-lg"
            />
          </div>
        ))}
        {photoUrl && (
          <div
            className={`flex flex-col items-center gap-2 p-1 rounded-full
             text-white transition-all duration-300 cursor-pointer mt-4
          ${selectedPhoto === photoUrl ? "bg-violet-500" : "bg-violet-300"}`}
            onClick={() => handleImageSelect(photoUrl)}
          >
            <Image
              src={photoUrl}
              alt="profile"
              width={300}
              height={300}
              className="h-30 w-30 rounded-full object.cover aspect-square" />
          </div>
        )}
        {showUploadPhoto ? (
          <UploadButton
            className="rounded-md text-slate-800 bg-slate-200 h-full"
            endpoint="profileImage"
            onClientUploadComplete={(res) => {
              console.log(res)
              setphotoUrl(res?.[0]?.url)
              setshowUploadPhoto(false)
            }}
            onUploadError={(error: Error) => {
              console.log(error)
            }}
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center
           hover:bg-slate-100 h-full rounded-full cursor-pointer border"
            onClick={() => setshowUploadPhoto(!showUploadPhoto)}
          >
            <Plus className="w-7 h-7" />
          </div>
        )}

      </div>
      <div className="mt-5">
        <h3 className="text-lg text-center">Add your username</h3>
        <div className="grid gap-4">
          <Input
            placeholder="name"
            className="w-full"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <Input
            placeholder="username"
            className="w-full"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
        <div className="mt-6 md:mt-16">
          <Button
            className="w-full bg-purple-600"
            onClick={hanndleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
