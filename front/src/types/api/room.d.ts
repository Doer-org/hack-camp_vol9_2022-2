// room作成
export interface IPostCreateNewRoomInput {
  room_name: string;
  max_count: number;
}

export interface IPostCreateNewRoomOutput {
  room_id: string;
  room_name: string;
  max_count: number;
  // status: string;
}

// 新規メンバー追加
export interface IPostAddNewMemberInput {
  user_name: string;
  room_id: string;
}

export interface IPostAddNewMemberOutput {
  user_id: string;
  user_name: string;　//なくていい
  room_id: string;　//なくていい
}
// TODO room infoを取得する

// export interface IPostCreateNewRoomOutput {
// 	id: string;
// 	name: string;
// 	max_count: number;
// 	status: string;
// 	create_at: Date;
// }

// export interface IGetRoomInfoInput {
//  roomID: string;
// }

// export interface IGetRoomInfoOutput {
// 	id: string;
// 	name: string;
// 	max_count: number;
// 	status: "created"|"finished"
// 	create_at: Date;
// }
