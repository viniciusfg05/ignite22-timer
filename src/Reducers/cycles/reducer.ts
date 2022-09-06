import { ActionTypes } from "./actions"

export interface CycleProps {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: CycleProps[]
  activeCycleId: string | null
}



export function CyclesReducer(state: CyclesState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
          return {
            ...state,
            cycles: [...state.cycles, action.payLond.newCycle],
            activeCycleId: action.payLond.newCycle.id // setando o id como ciclo ativo
          }
        case ActionTypes.INTERRUPTED_CURENT_CYCLE:
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
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
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
}