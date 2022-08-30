import { MunutesAmountInput, TaskInput, FormContainer } from "./styles";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from "react";
import { CycleContext } from "../..";

export function NewCycleForm() {
  const { activeCycle} = useContext(CycleContext)
  const { register } = useFormContext()

  return (
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
    )
}