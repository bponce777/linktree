import { createContext, useState } from "react"
import { StepConfigUserContextProviderProps, StepConfigUserContextType } from "./StepConfigUser.types"

export const StepConfigUserContext = createContext<StepConfigUserContextType>({
  step: 1,
  setStep: () => { },
  infoUser: {
    typeUser: "",
    name: "",
    platforms: [],
    avatarUrl: "",
    username: ""
  },
  setInfoUser: () => { },
  totalSteps: 5,
  nextStep: () => { },
  prevStep: () => { }
})

export function StepConfigUserProvider({
  children,
}: StepConfigUserContextProviderProps) {
  const [step, setStep] = useState(1)
  const [infoUser, setInfoUser] = useState<StepConfigUserContextType["infoUser"]>({
    typeUser: "",
    name: "",
    platforms: [],
    avatarUrl: "",
    username: ""
  })

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1)
  }
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1)
  }
  const totlaSteps = 5

  const data = {
    step,
    setStep,
    infoUser,
    setInfoUser,
    totalSteps: totlaSteps,
    nextStep,
    prevStep
  }

  return (
    <StepConfigUserContext.Provider value={data}>
      {children}
    </StepConfigUserContext.Provider>
  )
}