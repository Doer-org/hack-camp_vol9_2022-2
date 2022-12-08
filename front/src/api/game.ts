import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import {
    IClientProgress,
    IClientAction,
    IClientFinish,

    TServerMessageType, 
    IServerRanking,
    IServerProgress,
    IServerFinish, 
} from '@/types/api/game'

import { AxiosClient } from '@/api/AxiosClient'
import axios, {AxiosInstance} from 'axios'
import { tryParse } from '@/api/util'

// type に応じて返す方をカエル
// string -> json -> 


interface WSMessage { 
    type: TServerMessageType,
    data: any
}

 
 
export const parseGameWS = (server_message : string) : O.Option<IServerRanking | IServerProgress | IServerFinish> => {
    const json : WSMessage = JSON.parse(server_message)
    switch (json.type) {
        case ('server_current_ranking') : {
            return tryParse<IServerRanking>(json.data) 
        };
        case ('server_user_progress') : {
            return tryParse<IServerProgress>(json.data)  
        };
        case ('server_finish') : {
            return tryParse<IServerFinish>(json.data)   
        };
        default : {
            console.log('unexpected messagse type')
            return O.none
        }
    }
}

 