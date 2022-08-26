import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from "./Components/NewCicleForm";
import { CountDown } from "./Components/CountDown";

interface CycleProps {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  FinashedDate?: Date;
}

interface CycleContextType {
  activeCycle: CycleProps | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
}

export const CycleContext = createContext({} as CycleContextType)


export function Home() { 
  const [ cycles, setCicles ] = useState<CycleProps[]>([])
  const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null)

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    setCicles((state) =>
    state.map(cycles => {
      if(cycles.id === activeCycleId) {
        return { ...cycles, FinashedDate: new Date() }
      } else {
        return cycles
      }
    })
  )
  }

  // function handleCreateNewCyrcle(data: NewCycleFormProp s) {
  //   const id = String(new Date().getTime())
  //   // data recebe os dados do input
  //   const newCycle: CycleProps = {
  //     id, //Data atual convertida em numero
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date()
  //   }

  //   setCicles((state) => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setAmountSecondsPassed(0)

  //   reset()
  // }

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



  // const isInputFilled = watch('task')
  // const isSubmitDisabled = !isInputFilled

  return (
    <HomeContainer>
      <form /*</HomeContainer>onSubmit={handleSubmit(handleCreateNewCyrcle)} action=""*/>
        <CycleContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished}} >
          {/* <NewCycleForm /> */}

          <CountDown />

          { activeCycle ? (
            <StopCountDownButton onClick={handleInterruptCycle} type="button">
              <HandPalm size={24} />
              Interromper
            </StopCountDownButton>
          ) : (
            <StartCountDownButton /*disabled={isSubmitDisabled}*/ type="submit">
              <Play size={24} />
              Começar
            </StartCountDownButton>
          ) }
        </CycleContext.Provider>

      </form> 
    </HomeContainer>
  )
}
