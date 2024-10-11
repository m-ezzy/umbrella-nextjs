import useSWR from "swr"
import { create } from "zustand"

export const useStore = create((set) => ({
  userInfo: null,
  useFetch: (key: string) =>
    useSWR(key, {
      suspense: true,
      onSuccess: (data) => {
        set({ data: data });
      }
    })
}))
