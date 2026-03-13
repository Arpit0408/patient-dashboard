"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import PatientCard from "@/components/patient-card"
import SearchBar from "@/components/search-bar"
import SortDropdown from "@/components/sort-dropdown"
import FilterDropdown from "@/components/filter-dropdown"
import PatientTable from "@/components/patient-table"
import PatientCardSkeleton from "@/components/card-skeleton"
import PatientTableSkeleton from "@/components/table-skeleton"
import DownloadPDF from "@/components/downloadpdf"
export default function Home() {

  const [patients, setPatients] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState("")
const [issue, setIssue] = useState<string[]>([])
  const [view, setView] = useState("card")
  const [loading, setLoading] = useState(false)
  const [loadingView, setLoadingView] = useState(view)

const activeFilters =
  (sort ? 1 : 0) +
  issue.length


  async function fetchPatients() {
    setLoadingView(view)
    setLoading(true)

    const res = await fetch(
 `/api/patients?page=${page}&limit=8&search=${search}&sort=${sort}&issue=${issue.join(",")}`
)
    const result = await res.json()
    setPatients(result.data)
    setTotal(result.total)

    setLoading(false)
  }

  useEffect(() => {
    fetchPatients()
  }, [page, search, sort, issue])

const totalPages = Math.ceil(total / 8) // limit = 8
const maxVisible = 5

let startPage = Math.max(1, page - Math.floor(maxVisible / 2))
let endPage = startPage + maxVisible - 1

if (endPage > totalPages) {
  endPage = totalPages
  startPage = Math.max(1, endPage - maxVisible + 1)
}

const pages: number[] = []
for (let i = startPage; i <= endPage; i++) {
  pages.push(i)
}

  return (
    <div >


      <Header total={total} />

      <div className="px-6">
        <div className="w-full space-y-4">

          <div>
            <span className="w-fit flex items-center gap-6 border-b">
            <button
              onClick={() => setView("table")}
              className={`inline-block pb-2 text-sm font-medium border-b-2 ${view === "table"
                ? "border-blue-500 "
                : "border-transparent text-gray-500"
                }`}
            >
              Table View
            </button>

            <button
              onClick={() => setView("card")}
              className={`inline-block pb-2 text-sm font-medium border-b-2 ${view === "card"
                ? "border-blue-500 "
                : "border-transparent text-gray-500"
                }`}
            >
              Card View
            </button>
          </span>

        
          </div>

          {/* Search + Sort Row */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 py-4">

            <div className="flex-1 ">
              <SearchBar onSearch={setSearch} />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-blue-600">Sort by:</span>
              <SortDropdown onSort={setSort} />
              <FilterDropdown onFilter={setIssue} />
            </div>

          </div>
{/* Active Filters */}
<div className="flex items-center gap-2 flex-wrap mt-2">

  {sort && (
    <div className="flex items-center gap-2 px-3 py-[6px] text-xs border rounded bg-white shadow-sm">
      Sort: {sort}
      <button
        onClick={() => setSort("")}
        className="text-gray-500 hover:text-red-500"
      >
        ✕
      </button>
    </div>
  )}

 {issue.map((i) => (
  <div key={i} className="px-3 py-1 border rounded flex items-center gap-2">
    {i}
    <button
      onClick={() =>
        setIssue(issue.filter(item => item !== i))
      }
    >
      ✕
    </button>
  </div>
))}

</div>
        </div>

        <div className="flex justify-end pb-4">
          <DownloadPDF patients={patients} />
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
            {patients.map((p: any) => (
              <PatientCard key={p.patient_id} patient={p} />
            ))}
          </div>
        ) : (
          <PatientTable patients={patients} />
        )}

 <div className="flex items-center justify-center gap-2 m-4 text-sm">

  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Previous
  </button>

  {pages.map((num) => (
    <button
      key={num}
      onClick={() => setPage(num)}
      className={`px-3 py-1 rounded border ${
        page === num
          ? "bg-blue-500 text-white border-blue-500"
          : "hover:bg-gray-100"
      }`}
    >
      {num}
    </button>
  ))}

  <button
    onClick={() => setPage(page + 1)}
    disabled={page === totalPages}
    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Next
  </button>

</div>
      </div>

    </div>
  )
}