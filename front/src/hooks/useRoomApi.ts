import * as RoomApi from '@/api/room';
export const useRoomApi = () => { 
    return {
        postCreateRoom: RoomApi.postCreateRoom,
        postAddNewMember: RoomApi.postAddNewMember,
    }
}