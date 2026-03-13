import { NextRequest, NextResponse } from "next/server"
import patients from "@/data/patients.json"

export async function GET(req: NextRequest) {
  const issues = Array.from(
    new Set(patients.map((p) => p.medical_issue).filter(Boolean))
  )

  return NextResponse.json({ issues })
}