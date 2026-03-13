"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
  onSort: (value: string) => void
}

export default function SortDropdown({ onSort }: Props) {

  return (
    <Select onValueChange={onSort}>

      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="name">Name</SelectItem>
        <SelectItem value="age">Age</SelectItem>
      </SelectContent>

    </Select>
  )
}