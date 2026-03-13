"use client"

import { useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"

interface Props {
  onSearch: (value: string) => void
}

export default function SearchBar({ onSearch }: Props) {

  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      onSearch(value)
    }, 500) 


    useEffect(() => {
  return () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
  }
}, [])
  }

  return (
    <Input
      placeholder="Search patients..."
      className="max-w-md"
      onChange={handleChange}
    />
  )
}