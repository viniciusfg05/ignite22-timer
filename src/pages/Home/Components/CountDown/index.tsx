import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CycleContext } from "../..";
import { CountDownContainer, Separator } from "./styles";


export function CountDown() {
  const { activeCycle, setSecondsPassed, amountSecondsPassed , markCurrentCycleAsFinished} = useContext(CycleContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 // Convert os minutos em segundos

  useEffect(() => {
    let interval: number;

    // Se tiver um ciclo ativo, vou da um setInterfvalo
    if(activeCycle) {
      interval = setInterval(() => {
        // diferença da data atual com a data do startCicle
        const secondsDifference = differenceInSeconds( new Date(), activeCycle.startDate )

        if(secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()

          setSecondsPassed(totalSeconds)
          clearInterval(interval)

        } else {
          // se ainda não completou o total de segundo eu atualizado os segundos restantes
          setSecondsPassed(secondsDifference)
        }


      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])
  
  
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 // total de segundos menos o segundo que passou 

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60 // Pega o resto da divisão

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  // Mostra o time no title da aba
  useEffect(() => {
    if(activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds])

  return (
      <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}