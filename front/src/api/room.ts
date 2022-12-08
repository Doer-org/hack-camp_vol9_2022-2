import * as TE from 'fp-ts/TaskEither'
import {

    IPostAddNewMemberInput,
    IPostAddNewMemberOutput,
    IPostCreateNewRoomInput,
    IPostCreateNewRoomOutput    
} from '@/types/api/room'
import { AxiosClient } from '@/api/AxiosClient'
import axios, {AxiosInstance} from 'axios'  


export const postCreateRoom = (input : IPostCreateNewRoomInput) : TE.TaskEither<Error, IPostCreateNewRoomOutput> => {
    return TE.tryCatch(
        async () => { 
            const { data } =  
                await AxiosClient().post(`/room/new`,  input) 
            return data.data
        },
        (reason) => new Error(String(reason)),
    )
}


export const postAddNewMember = (input: IPostAddNewMemberInput) : TE.TaskEither<Error, IPostAddNewMemberOutput> => { 
    return TE.tryCatch(
        async () => { 
            const { data } =  
                await AxiosClient()
                    .post(`/member/new?room_id=${input.room_id}`, input)
            return data.data
        },
        (reason) => new Error(String(reason)),
    )
}
 