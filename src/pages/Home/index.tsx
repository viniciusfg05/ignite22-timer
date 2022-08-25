import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod' // usamos ess sitaxe, quando a bibioteca não exporta default
import { CountDownContainer, FormContainer, HomeContainer, MunutesAmountInput, Separator, StartCountDownButton, StopCountDownButton, TaskInput } from "./styles";
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'


const newCycleFormValidationSchema = zod.object({
  //Validando um objeto por isso, zod.object
  task: zod.string().min(5, "Informe a tarefa"),
  minutesAmount: zod.number().min(1, 'Ciclo precisar ser no mínimo 5 minutos').max(60, 'Ciclo precisar ser no mínimo 60 minutos')
})

type NewCycleFormProps = zod.infer<typeof newCycleFormValidationSchema>

interface CycleProps {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  FinashedDate?: Date;
}

export function Home() {
  const [ cycles, setCicles ] = useState<CycleProps[]>([])
  const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null)
  const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0) // Armazena o total de segundo que passo
  console.log(cycles)

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 // Convert os minutos em segundos


  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormProps>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  useEffect(() => {
    let interval: number;

    // Se tiver um ciclo ativo, vou da um setInterfvalo
    if(activeCycle) {
      interval = setInterval(() => {
        // diferença da data atual com a data do startCicle
        const secondsDifference = differenceInSeconds( new Date(), activeCycle.startDate )

        if(secondsDifference >= totalSeconds) {
          setCicles((state) =>
            state.map(cycles => {
              if(cycles.id === activeCycleId) {
                return { ...cycles, FinashedDate: new Date() }
              } else {
                return cycles
              }
            })
          )

          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)

        } else {
          // se ainda não completou o total de segundo eu atualizado os segundos restantes
          setAmountSecondsPassed(secondsDifference)
        }


      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

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

  const isInputFilled = watch('task')
  const isSubmitDisabled = !isInputFilled

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCyrcle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            list="taskSuggestions"
            disabled={!!activeCycle}
            placeholder="Dê um nome para seu projeto"
            {...register('task')} // nome para o input, tira o id que o register  já 

          />
    
          <datalist id="taskSuggestions">
            <option value="Projeto 1" />
            <option value="Projeto 1" />
            <option value="banana 1" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MunutesAmountInput
            type='number'
            placeholder="00"
            disabled={!!activeCycle}
            step=""
            min="1"
            max="60"
            {...register('minutesAmount', { valueAsNumber: true })}
          />
    
          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

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
