import { useState } from "react";
import { HandlerStepsProps } from "./HandlerSteps.types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useStepConfig } from "@/hooks/useStepConfig";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { StepOne } from "../StepOne";
import { StepTwo } from "../StepTwo";
import { StepThree } from "../StepThree";
import { StepFour } from "../StepFour";
import { Sumarry } from "../Sumarry";

export function HanlderSteps(props: HandlerStepsProps) {
  const { onReload } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const { totalSteps, step, setStep, nextStep, prevStep, infoUser } = useStepConfig();

  const progressValue = (step / totalSteps) * 100;
  console.log("infoUser", infoUser)

  const onCloseDialog = () => {
    setOpenDialog(false);
    onReload(true)
  }

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-3">
            {step > 1 && step < 5 && (
              <Button variant="outline" className="mr-2" onClick={prevStep}>
                Back <ArrowLeft />
              </Button>
            )}
            <div className="mb-2 text-center">
              step {step} of {totalSteps}
            </div>
            <Progress value={progressValue} />
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              {step === 1 && <StepOne />}
              {step === 2 && <StepTwo />}
              {step === 3 && <StepThree />}
              {step === 4 && <StepFour />}
              {step === 5 && <Sumarry onReload={onCloseDialog} />}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>

  )
}
