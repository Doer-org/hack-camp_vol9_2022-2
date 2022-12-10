import create from "zustand"
import { persist } from 'zustand/middleware'

interface RoomInfo {
    roomName : string
    roomId : string 
}
const initUserInfo : RoomInfo = {
    roomName : "",
    roomId : ""
}

interface RoomInfoStore {
    roomInfo : RoomInfo
    setRoomInfo : (info : RoomInfo) => void
}

export const useRoomInfoStore = create<RoomInfoStore>()(
    persist(

        (set) => ({ 
            roomInfo : initUserInfo,
            setRoomInfo : (info : RoomInfo) => set(({roomInfo: info}))
        })

    )
    )