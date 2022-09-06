import { createContext, ReactNode, useReducer, useState } from "react";
import { NewCycleForm } from "../pages/Home/Components/NewCicleForm";

interface CycleProps {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  FinashedDate?: Date;
}

interface CreateNewCycleProps {
  task: string;
  minutesAmount: number;
}

interface CycleContextType {
  cycles: CycleProps[];
  activeCycle: CycleProps | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateNewCycleProps) => void;
  handleInterruptCycle: () => void;
}

interface CycleContextProviderProps {
  children: ReactNode; // qualquer html valido
}

interface CycleState {
  cycles: CycleProps[];
  activeCycleId: string | null;
}

export const CycleContext = createContext({} as CycleContextType);

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer((state: CycleState, action: any) => {
    switch (action.type) {
      case 'ADD_NEW_CYCLE':
        return {
          ...state,
          cycles: [...state.cycles, action.payLond.newCycle],
          activeCycleId: action.payLond.newCycle.id // setando o id como ciclo ativo
        }
      case 'INTERRUPTED_CURENT_CYCLE':
        return {
          ...state,
          cycles: state.cycles.map((cycles) => {
            // se o ciclo ativo for
            if (cycles.id === state.activeCycleId) {
              // retornar todos os dados e add a infomração de interruptedDate
              return { ...cycles, interruptedDate: new Date() };
            } else {
              return cycles;
            }
          }),
          activeCycleId: null,
        }
      case 'MARK_CURRENT_CYCLE_AS_FINISHED':
        return {
          ...state,
          cycles: state.cycles.map((cycles) => {
            // se o ciclo ativo for
            if (cycles.id === state.activeCycleId) {
              // retornar todos os dados e add a infomração de interruptedDate
              return { ...cycles, FinashedDate: new Date() };
            } else {
              return cycles;
            }
          }),
          activeCycleId: null,
        }
      default:
        return state
    }
    
  }, {
    // state
    cycles: [],
    activeCycleId: null,
  }, )

  const { cycles, activeCycleId } = cyclesState

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0); // Armazena o total de segundo que passo

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch({
    type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payLond: {
        activeCycleId
      }
    })
  }

  function createNewCycle(data: CreateNewCycleProps) {
    const id = String(new Date().getTime());
    // data recebe os dados do input
    const newCycle: CycleProps = {
      id, //Data atual convertida em numero
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setAmountSecondsPassed(0);

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payLond: {
        newCycle,
      }
    })

  }

  function handleInterruptCycle() {
    dispatch({
      type: 'INTERRUPTED_CURENT_CYCLE',
      payLond: {
        activeCycleId
      }
    })

  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        handleInterruptCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
