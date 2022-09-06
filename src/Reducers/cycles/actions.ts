import { CycleProps } from "./reducer";

export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPTED_CURENT_CYCLE = 'INTERRUPTED_CURENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED'
}

export function addNewCycleAction(newCycle: CycleProps) {
    return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payLond: {
          newCycle,
        }
    }
}

export function markCurrentCycleAsFinishedAction(activeCycleId: string) {
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
        payLond: {
            activeCycleId,
        }
    }
}

export function handleInterruptCycleAction(activeCycleId: string) {
    return {
        type: ActionTypes.INTERRUPTED_CURENT_CYCLE,
        payLond: {
            activeCycleId,
        }
    }
}