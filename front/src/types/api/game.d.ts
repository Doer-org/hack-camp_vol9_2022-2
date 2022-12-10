
export type TClientMessageType = "client_action" | "client_key_input" | "client_finish"
// 進捗
export type IClientProgress = {  
    type : "client_key_input"
    data : { 
        user_id: string; 
        Q_n : number;
        Q_n_i: number;
        typo: boolean
    }
}

// アクション
export type IClientAction = {
    type : "client_action"  
    data : { 
        user_id: string; 
        attack : string;
    }
}

// 終了
export type IClientFinish = { 
    type : "client_finish"
    data : { 
        user_id: string;  
    } 
}


export type TServerMessageType = "server_current_ranking" | "server_user_progress" | "server_finish"
// export enum TServerMessageType {
//     server_current_ranking = "server_current_ranking",
//     server_user_progress = "server_user_progress",
//     server_finish = "server_finish"
// }

// ランキング更新
export interface IServerRanking { 
    type : "server_current_ranking"
    data : { 
        ranking : {user_name: string, user_id: string,rank: number}[]
    }
}

export interface IServerProgress { 
    type : "server_user_progress"
    data : { 
        members : {user_name: string, user_id: string, Q_n: number, Q_n_i: number, typo: boolean}[]
    }
}
 

// ランキング更新
export interface IServerFinish { 
    type :  "server_finish"
    data : {    
        
        some_data : string;
    }
}
 