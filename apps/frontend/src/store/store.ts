import { Customer } from '../types/api';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface State {
  info?: Customer;
}

export interface Action {
  setInfo: (info: Customer) => void;
}

export type AccountState = State & Action;

const useStore = create<AccountState>()(
  persist(
    (set) => ({
      info: undefined,
      setInfo: (info: Customer) =>
        set(() => ({
          info,
        })),
    }),
    {
      name: 'info-store', // localStorage key
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useStore;
