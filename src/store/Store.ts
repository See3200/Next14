import { fetcher } from "@/network/api";
import { User } from "@/types/User";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useStore = create<BearStore>()(
  devtools(
    immer((set, get) => ({
      bears: 0,
      increasePopulation: (number: number) => set((state) => ({ bears: state.bears + number })),
      removeAllBears: () => set({ bears: 0 }),

      users: [],
      error: "",
      setUsers: (users: User[]) => set({ users }),
      setError: (error: string) => set({ error: error }),
      resetError: () => set({ error: "" }),
      fetchUsers: async () => {
        get().resetError();
        const data = await fetcher("users");
        if (data.error) return set({ error: data.error });
        set({ users: data?.data });
      },
    })),
  ),
);

export interface BearStore {
  bears: number;
  increasePopulation: (number: number) => void;
  removeAllBears: () => void;
  users: User[];
  error: string;
  setUsers: (users: User[]) => void;
  setError: (error: string) => void;
  resetError: () => void;
  fetchUsers: () => void;
}

export default useStore;
