import * as TE from 'fp-ts/TaskEither'
import {
    IGetQuestionsInput,
    IGetQuestionsOutput,
    
} from '@/types/api/question'
import { AxiosClient } from '@/api/AxiosClient'
import axios, {AxiosInstance} from 'axios'


export const getQuestions = (input: IGetQuestionsInput) : TE.TaskEither<Error, IGetQuestionsOutput> => { 
    return TE.tryCatch(
        async () => { 
            const { data } =  
                await AxiosClient().get(`/questions`)
            return data.data
        },
        (reason) => new Error(String(reason)),
    )
}