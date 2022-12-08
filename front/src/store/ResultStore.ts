import create from "zustand"
import { persist } from 'zustand/middleware'
import { Question } from '@/types/Question' 

interface Result {
    questions : Question[]
    accurasy : number 
}
const initResult : Result = {
    questions : [],
    accurasy : 0.0
}

interface ResultStore {
    result: Result
    setResult : (info : Result) => void
}

export const useResultStore = create<ResultStore>()(
    persist(   
        (set) => ({ 
            result : initResult,
            setResult : (state : Result) => 
                set({result: state})
        })
    ))