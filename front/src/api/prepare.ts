import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import {
    TServerMessageType, 
    IServerJoin, 
} from '@/types/api/prepare'

import { AxiosClient } from '@/api/AxiosClient'
import axios, {AxiosInstance} from 'axios'

// type に応じて返す方をカエル
// string -> json -> 

import { tryParse } from '@/api/util'

interface WSMessage { 
    type: TServerMessageType,
    data: any
}

 
export const parsePrepairWS = (server_message : string) : O.Option<IServerJoin[]> => {
    console.log("parsePrepairWS > " + server_message)
    const json : WSMessage = JSON.parse(server_message)
    switch (json.type) {
        case ('server_join') : {
            tryParse<IServerJoin[]>(json.data) 
        };
        default : {
            console.log('unexpected messagse type')
            return O.none
        }
    }
}

 