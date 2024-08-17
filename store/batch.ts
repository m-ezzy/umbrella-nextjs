import { create } from "zustand"

const useBatch = create((set: any) => {
  return {
    batch_id: null,
    year_started: null,
    changeBatch: (batch: any) => set((state: any) => ({ batch: batch })),
  }
})

export default useBatch
