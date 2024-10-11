import useSWR from "swr"
import fetcher from "@/lib/fetcher"

function useDepartment(id: any) {
  const { isLoading, isValidating, error, data, mutate } = useSWR(`/api/objects/department/${id}`, fetcher)

  return {
    isLoading,
    isError: error
    user: data,
  }
}
