import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { useContext } from "react";
import { NewCycleForm } from "./Components/NewCicleForm";
import { CountDown } from "./Components/CountDown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod' // usamos ess sitaxe, quando a bibioteca não exporta default
import { CycleContext } from "../../context/CyclesContext";
 
const newCycleFormValidationSchema = zod.object({
  //Validando um objeto por isso, zod.object
  task: zod.string().min(5, "Informe a tarefa"),
  minutesAmount: zod.number().min(1, 'Ciclo precisar ser no mínimo 5 minutos').max(60, 'Ciclo precisar ser no mínimo 60 minutos')
})

type NewCycleFormProps = zod.infer<typeof newCycleFormValidationSchema>


export function Home() {
  const { createNewCycle, handleInterruptCycle, activeCycle } = useContext(CycleContext)

  const useFormProps = useForm<NewCycleFormProps>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = useFormProps

  const isInputFilled = watch('task')
  const isSubmitDisabled = !isInputFilled

   function handleCreateNewCycle(data: NewCycleFormProps) {
      createNewCycle(data)
      reset()
   }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

          <FormProvider {...useFormProps}>
            <NewCycleForm />
          </FormProvider>

          <CountDown />

          { activeCycle ? (
            <StopCountDownButton onClick={handleInterruptCycle} type="button">
              <HandPalm size={24} />
              Interromper
            </StopCountDownButton>
          ) : (
            <StartCountDownButton disabled={isSubmitDisabled} type="submit">
              <Play size={24} />
              Começar
            </StartCountDownButton>
          ) }

      </form> 
    </HomeContainer>
  )
}
