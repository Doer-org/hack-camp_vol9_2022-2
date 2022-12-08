import create from "zustand"
import { persist } from 'zustand/middleware'

interface UserInfo {
    userName : string
    userId : string 
}
const initUserInfo : UserInfo = {
    userName : "",
    userId : ""
}

interface UserInfoStore {
    userInfo : UserInfo
    setUserInfo : (info : UserInfo) => void
}

export const useUserInfoStore = create<UserInfoStore>()(
    persist(   
        (set) => ({ 
            userInfo : initUserInfo,
            setUserInfo : (info : UserInfo) => set(({userInfo: info}))
        })
    ))