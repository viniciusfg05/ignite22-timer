import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod' // usamos ess sitaxe, quando a bibioteca não exporta default
import { CountDownContainer, FormContainer, HomeContainer, MunutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";

const newCycleFormValidationSchema = zod.object({
  //Validando um objeto por isso, zod.object
  task: zod.string().min(5, "Informe a tarefa"),
  minutesAmount: zod.number().min(5, 'Ciclo precisar ser no mínimo 5 minutos').max(60, 'Ciclo precisar ser no mínimo 60 minutos')
})

export function Home() {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema)
  }) 

  function handleCreateNewCyrcle(data: any) {
    // data recebe os dados do input
    console.log(data);
  }

  const isInputFilled = watch('task')
  const isSubmitDisabled = !isInputFilled

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCyrcle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            list="taskSuggestions"
            placeholder="Dê um nome para seu projeto"
            {...register('task')} // nome para o input, tira o id que o register já 

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
            step="5"
            min="5"
            max="60"
            {...register('minutesAmount', { valueAsNumber: true })}
          />
    
          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form> 
    </HomeContainer>
  )
}
