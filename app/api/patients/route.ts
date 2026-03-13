import { NextRequest, NextResponse } from "next/server"
import patients from "@/data/patients.json"

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url)

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 12
  const search = searchParams.get("search") || ""
  const sort = searchParams.get("sort") || ""
  const issue = searchParams.get("issue") || ""

  let data = [...patients]

  // SEARCH
  if (search) {
    data = data.filter((p) =>
      p.patient_name.toLowerCase().includes(search.toLowerCase())
    )
  }

  // FILTER
  if (issue) {
    data = data.filter((p) =>
      p.medical_issue.toLowerCase() === issue.toLowerCase()
    )
  }

  // SORT
  if (sort === "age") {
    data.sort((a, b) => a.age - b.age)
  }

  if (sort === "name") {
    data.sort((a, b) =>
      a.patient_name.localeCompare(b.patient_name)
    )
  }

  // PAGINATION
  const start = (page - 1) * limit
  const end = start + limit

  const paginatedData = data.slice(start, end)

  return NextResponse.json({
    data: paginatedData,
    total: data.length,
    page,
    limit
  })
}