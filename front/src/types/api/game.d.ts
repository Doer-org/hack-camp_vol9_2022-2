
export type TClientMessageType = "action" | "progress" | "finish"
// 進捗
export interface IClientProgress {  
    user_id: string; 
    Q_n : number;
    Q_n_i: number;
    typo: boolean
}

// アクション
export interface IClientAction {
    type : "action"
    user_id: string; 
    attack : string;
}

// 終了
export interface IClientFinish { 
    type : "finish"
    user_id: string;  

}



export type TServerMessageType = "server_current_ranking" | "server_user_progress" | "server_finish"

// ランキング更新
export interface IServerRanking { 
    ranking : {user_name: string, user_id: string,rank: number}[]
}

export interface IServerProgress { 
    members : {user_name: string, user_id: string, Q_n: number, Q_n_i: number, typo: boolean}[]
}
 

// ランキング更新
export interface IServerFinish { 
    some_data : string;
}
 