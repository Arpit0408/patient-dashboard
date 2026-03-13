"use client"

import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

interface Props {
  onFilter: (value: string) => void
}

export default function FilterDropdown({ onFilter }: Props) {
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    async function fetchOptions() {
      const res = await fetch("/api/medical-issues")
      const data = await res.json()
      setOptions(data.issues)
    }

    fetchOptions()
  }, [])

  return (
    <Select onValueChange={onFilter}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filter Issue" />
      </SelectTrigger>
      <SelectContent>
        {options.map((issue) => (
          <SelectItem key={issue} value={issue}>
            {issue}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}