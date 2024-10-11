import useSWR from "swr"

export const useUniversity = (university_id: string) => {
  const { isLoading, isValidating, error, data, mutate } = useSWR(`/api/objects/university/${university_id}`, {
    revalidateOnFocus: false,
  })
  return {
    isLoading,
    isValidating,
    error,
    data,
    mutate,
  }
}
