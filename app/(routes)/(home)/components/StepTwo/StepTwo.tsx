import { Button } from "@/components/ui/button";
import { useStepConfig } from "@/hooks/useStepConfig";
import { stepTwoData } from "./StepTwo.data";
import Image from "next/image";
import { useState } from "react";

export function StepTwo() {
  const { setInfoUser, infoUser, nextStep } = useStepConfig();
  const [selectedPlatforms, setselectedPlatforms] = useState<string[]>(
    infoUser?.platforms?.map((platform) => platform.name) || []
  )

  const handleSelectPlatform = (platform: string) => {
    setselectedPlatforms((prevSelected) => {
      if (prevSelected.includes(platform)) {
        return prevSelected.filter((prevPlatform) => prevPlatform !== platform)
      }
      return [...prevSelected, platform]
    })
  }

  const handleContinue = () => {
    setInfoUser((prevInfoUser) => ({
      ...prevInfoUser,
      platforms: stepTwoData.filter(({ name }) => selectedPlatforms.includes(name))
    }))
    nextStep()
  }

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">Wich platforms are you on</h2>
      <p className="text-center">Pickup the ones you are on</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 mt-4">
        {stepTwoData.map(({ icon, name }) => (
          <div
            key={name}
            className={`flex flex-col gap-1 items-center rounded-lg py-3 justify-center 
           hover:violet-300 transition-all duration-300 cursor-pointer
           ${selectedPlatforms.includes(name) ? "bg-violet-900 text-white" :
                "bg-slate-100 text-violet-900"}
           `}
            onClick={() => handleSelectPlatform(name)}
          >
            <Image src={icon} alt={name} width={40} height={40} />
            <p className="tex-sm">{name}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Button
          onClick={handleContinue}
          className="w-full bg-purple-600">
          Continue
        </Button>
      </div>
    </div>
  )
}
