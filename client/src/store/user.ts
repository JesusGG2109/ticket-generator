import { create } from 'zustand';

interface UserData {
  fullName: string;
  email: string;
  githubUser: string;
  url: string;
}

interface User extends UserData {
  setUser: (user: UserData) => void;
  clearUser: () => void;
}

const empty: UserData = {
  email: '',
  fullName: '',
  githubUser: '',
  url: '',
};

export const useUserStore = create<User>()((set) => ({
  ...empty,
  setUser: (user: UserData) =>
    set(() => ({
      email: user.email,
      fullName: user.fullName,
      githubUser: user.githubUser,
      url: user.url,
    })),
  clearUser: () => set(() => empty),
}));
