"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
  onSort: (value: string) => void
}

export default function SortDropdown({ onSort }: Props) {

  return (
<Select onValueChange={onSort}>
  <SelectTrigger className="w-[140px] border border-[#8F8F8F] rounded-[5px]">
    <SelectValue placeholder="option 1" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="name">Name</SelectItem>
    <SelectItem value="age">Age</SelectItem>
  </SelectContent>
</Select>

  )
}