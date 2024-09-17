import { User } from "@/types/User";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import useStore from "./Store";

const AppStore = create<AppStore>()(
  devtools(
    immer((set, get) => ({
      isAuthenticated: false,
      setIsAuthenticated: (status: boolean) => set({ isAuthenticated: status }),
      reduceUsers: () => {
        const { users, setUsers } = useStore.getState();
        setUsers(users.slice(0, 2));

        //unnecessary
        const newList = [...users];
        return newList;
      },
    })),
  ),
);

export interface AppStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (status: boolean) => void;
  reduceUsers: () => User[];
}

export default AppStore;
