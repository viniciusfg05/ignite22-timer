import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from "./Components/NewCicleForm";
import { CountDown } from "./Components/CountDown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod' // usamos ess sitaxe, quando a bibioteca não exporta default






export const CycleContext = createContext({} as CycleContextType)

const newCycleFormValidationSchema = zod.object({
  //Validando um objeto por isso, zod.object
  task: zod.string().min(5, "Informe a tarefa"),
  minutesAmount: zod.number().min(1, 'Ciclo precisar ser no mínimo 5 minutos').max(60, 'Ciclo precisar ser no mínimo 60 minutos')
})

type NewCycleFormProps = zod.infer<typeof newCycleFormValidationSchema>


export function Home() { 
  const useFormProps = useForm<NewCycleFormProps>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = useFormProps

  function handleCreateNewCyrcle(data: NewCycleFormProps) {
    const id = String(new Date().getTime())
    // data recebe os dados do input
    const newCycle: CycleProps = {
      id, //Data atual convertida em numero
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCicles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    
    setCicles((state) =>
      state.map(cycles => {
        // se o ciclo ativo for
        if(cycles.id === activeCycleId) {
          // retornar todos os dados e add a infomração de interruptedDate
          return { ...cycles, interruptedDate: new Date() }
        } else {
          return cycles
        }
      })
      )

    setActiveCycleId(null) // de volta a null, pq n~]ao quero nenhum ciclo ativo
  }



  const isInputFilled = watch('task')
  const isSubmitDisabled = !isInputFilled

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCyrcle)} action="">

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
