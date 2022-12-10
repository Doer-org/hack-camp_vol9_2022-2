import * as O from 'fp-ts/Option'
import {
    TClientMessageType,
    IClientProgress,
    IClientAction,
    IClientFinish,
    TServerMessageType,
    IServerRanking,
    IServerProgress,
    IServerFinish,
} from '@/types/api/game'

import { tryParse } from '@/util/jsonParser'

interface WSMessage<T> {
    type: TServerMessageType | TClientMessageType,
    data: T
}
export const createIClientProgress = (
    d: {
        user_id: string;
        Q_n: number;
        Q_n_i: number;
        typo: boolean
    }
): IClientProgress => {
    return (
        {
            type: "client_key_input",
            data: d
        }
    )
}

export const createIClientAction = (
    d: {
        user_id: string;
        attack: string;
    }
): IClientAction => {
    return (
        {
            type: "client_action",
            data: d
        }
    )
}

export const createIClientFinish = (
    d: {
        user_id: string;
    }
): IClientFinish => {
    return (
        {
            type: "client_finish",
            data: d
        }
    )
}

export const parseGameWS = (server_message: string)
    : O.Option<IServerRanking | IServerProgress | IServerFinish> => {

    const json: WSMessage<any> = JSON.parse(server_message)
    switch (json.type) {
        case ('server_current_ranking'): {
            return (
                tryParse<IServerRanking>(json)
            )
        };
        case ('server_user_progress'): {
            return (
                tryParse<IServerRanking>(json)
            )
        };
        case ('server_finish'): {
            return (
                tryParse<IServerFinish>(json)
            )
        };
        default: {
            // echo test
            console.log(tryParse<IClientProgress>(json))

            return O.none
        }
    }
}

