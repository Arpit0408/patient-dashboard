"use client"

import { useEffect, useState } from "react"
import PatientCard from "@/components/patient-card"
import SearchBar from "@/components/search-bar"
import SortDropdown from "@/components/sort-dropdown"
import FilterDropdown from "@/components/filter-dropdown"
import PatientTable from "@/components/patient-table"
import PatientCardSkeleton from "@/components/card-skeleton"
import PatientTableSkeleton from "@/components/table-skeleton"
export default function Home() {

  const [patients, setPatients] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState("")
  const [issue, setIssue] = useState("")
  const [view, setView] = useState("card")
  const [loading, setLoading] = useState(false)
  const [loadingView, setLoadingView] = useState(view)

async function fetchPatients() {
  setLoadingView(view) 
  setLoading(true)

  const res = await fetch(
    `/api/patients?page=${page}&limit=12&search=${search}&sort=${sort}&issue=${issue}`
  )

  const result = await res.json()
  setPatients(result.data)
  setTotal(result.total)

  setLoading(false)
}

  useEffect(() => {
    fetchPatients()
  }, [page, search, sort, issue])

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-2">
        Patient Directory
      </h1>

      <p className="text-gray-500 mb-6">
        {total} Patients Found
      </p>

     <div className="flex gap-4 items-center mb-6">

  <SearchBar onSearch={setSearch} />

  <FilterDropdown onFilter={setIssue} />

  <SortDropdown onSort={setSort} />

</div>

<div className="flex gap-3 mb-6">

  <button
    onClick={() => setView("card")}
    className={`px-4 py-2 border rounded ${
      view === "card" ? "bg-black text-white" : ""
    }`}
  >
    Card View
  </button>

  <button
    onClick={() => setView("table")}
    className={`px-4 py-2 border rounded ${
      view === "table" ? "bg-black text-white" : ""
    }`}
  >
    Table View
  </button>

</div>
{loading ? (
  loadingView === "card" ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
      {Array.from({ length: 12 }).map((_, i) => (
        <PatientCardSkeleton key={i} />
      ))}
    </div>
  ) : (
    <PatientTableSkeleton />
  )
) : view === "card" ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
    {patients.map((p:any) => (
      <PatientCard key={p.patient_id} patient={p} />
    ))}
  </div>
) : (
  <PatientTable patients={patients} />
)}

      <div className="flex gap-4 mt-8">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 border rounded"
        >
          Previous
        </button>

        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>

      </div>

    </div>
  )
}