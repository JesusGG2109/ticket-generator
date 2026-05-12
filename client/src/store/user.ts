import { create } from 'zustand';

interface UserData {
  fullName: string;
  email: string;
  githubUser: string;
  url: string;
}

interface User extends UserData {
  setUser: (user:UserData)=> void
}

export const useUserStore = create<User>()((set)=>({
  email: "",
  fullName: "",
  githubUser: "",
  url: "",
  setUser: (user:UserData) => set(()=>({
    email: user.email,
    fullName: user.fullName,
    githubUser: user.githubUser,
    url: user.url
  }))
}))