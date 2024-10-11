// a custom hook to make a request to fetch data using useEffect and useState hooks

import { useEffect, useState } from 'react'

export function useRequest(url: string) {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        })
        const json = await res.json()
        setData(json)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    };
    fetchData()
  }, [url])

  return { loading, error, data }
}
