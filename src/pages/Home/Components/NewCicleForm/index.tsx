import { MunutesAmountInput, TaskInput, FormContainer } from "./styles";
import * as zod from 'zod' // usamos ess sitaxe, quando a bibioteca não exporta default
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';



const newCycleFormValidationSchema = zod.object({
  //Validando um objeto por isso, zod.object
  task: zod.string().min(5, "Informe a tarefa"),
  minutesAmount: zod.number().min(1, 'Ciclo precisar ser no mínimo 5 minutos').max(60, 'Ciclo precisar ser no mínimo 60 minutos')
})

type NewCycleFormProps = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormProps>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

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