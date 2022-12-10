
 
export type TServerMessageType = "server_join"
// メンバー追加通知
export interface IServerJoin {
    members : {user_name: string, user_id: string}[]
}