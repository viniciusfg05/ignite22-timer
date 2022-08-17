import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MunutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="" list="taskSuggestions" placeholder="Dê um nome para seu projeto" />
    
          <datalist id="taskSuggestions">
            <option value="Projeto 1" />
            <option value="Projeto 1" />
            <option value="banana 1" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MunutesAmountInput
            type='number'
            id="minutesAmount"
            placeholder="00"
            step="5"
            min="5"
            max="60"
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

        <StartCountDownButton type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form> 
    </HomeContainer>
  )
}
