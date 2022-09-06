import { createContext, ReactNode, useReducer, useState } from "react";
import { NewCycleForm } from "../pages/Home/Components/NewCicleForm";
import { ActionTypes, addNewCycleAction, handleInterruptCycleAction, markCurrentCycleAsFinishedAction } from "../Reducers/cycles/actions";
import { CycleProps, CyclesReducer } from "../Reducers/cycles/reducer";

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



export const CycleContext = createContext({} as CycleContextType);

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(CyclesReducer, {
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
    dispatch(markCurrentCycleAsFinishedAction(activeCycleId))
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

    dispatch(addNewCycleAction(newCycle));

  }

  function handleInterruptCycle() {
    dispatch(handleInterruptCycleAction(activeCycleId))

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
