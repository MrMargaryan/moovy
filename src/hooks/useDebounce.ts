import { useState, useEffect, Dispatch } from 'react'

const useDebounce = (term: string, delay: number): [string, Dispatch<string>] => {
  const [value, setValue] = useState(term)
  const [debouncedValue, setDebouncedValue] = useState(term)

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(debounce)
    }
  }, [value, delay])

  return [debouncedValue, setValue]
}

export default useDebounce