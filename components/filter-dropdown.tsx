"use client"

import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface Props {
  onFilter: (values: string[]) => void
}

export default function FilterDropdown({ onFilter }: Props) {

  const [options, setOptions] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    async function fetchOptions() {
      const res = await fetch("/api/medical-issues")
      const data = await res.json()
      setOptions(data.issues)
    }

    fetchOptions()
  }, [])

  function toggleIssue(issue: string) {

    let updated = []

    if (selected.includes(issue)) {
      updated = selected.filter(i => i !== issue)
    } else {
      updated = [...selected, issue]
    }

    setSelected(updated)
    onFilter(updated)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[160px] justify-start">
          {selected.length > 0
            ? `${selected.length} selected`
            : "Filter issue"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] space-y-2">
        {options.map((issue) => (
          <div
            key={issue}
            className="flex items-center gap-2"
          >
            <Checkbox
              checked={selected.includes(issue)}
              onCheckedChange={() => toggleIssue(issue)}
            />
            <span className="text-sm">{issue}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}