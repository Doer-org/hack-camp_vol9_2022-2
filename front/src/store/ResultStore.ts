import create from "zustand"
import { persist } from 'zustand/middleware' 
import {KeyLog, Question} from '@/types/Game'

interface Result {
    questions : Question[]
    records : KeyLog[][]
    accurasy : number 
}
const initResult : Result = {
    questions : [],
    records : [],
    accurasy : 0.0
}

interface ResultStore {
    result: Result
    setResult : (info : Result) => void
    init : () => void
}

export const useResultStore = create<ResultStore>()(
    persist(   
        (set) => ({ 
            result : initResult,
            setResult : (state : Result) => set({result: state}),
            init : () => set ({result: initResult})
        })
    ))