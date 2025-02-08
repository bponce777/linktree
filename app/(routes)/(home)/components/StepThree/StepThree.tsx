import { Button } from "@/components/ui/button"
import { useStepConfig } from "@/hooks/useStepConfig"
import Image from "next/image"

export function StepThree() {
  const { nextStep, infoUser, setInfoUser } = useStepConfig();

  const handleContinue = () => {
    const updatedPlatforms = infoUser.platforms.map(({ icon, name }) => {
      const input = document.getElementById(`${name}-input`) as HTMLInputElement
      return {
        icon,
        link: input.value || "",
        name
      }
    })
    setInfoUser((prevInfoUser) => ({
      ...prevInfoUser,
      platforms: updatedPlatforms
    }))
    nextStep()
  }

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">Add your links</h2>
      <p className="text-center">Complete fields to add your links</p>
      {infoUser.platforms.map(({ icon, link, name }) => (
        <div key={name} className="flex items-center gap-2 mt-4">
          <div className="flex flex-col gap-2 items-center">
            <Image src={icon} alt={name} width={40} height={40} />
          </div>
          <input
            id={`${name}-input`}
            type="text"
            className="w-full rounded-lg border p-2 text-sm"
            placeholder={`${name} username`}
            defaultValue={link}
          />
        </div>
      ))}
      <div className="mt-10">
        <Button
          className="w-full bg-purple-600"
          onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
