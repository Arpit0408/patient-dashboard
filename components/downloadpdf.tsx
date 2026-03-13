"use client"

import { Download } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export default function DownloadPDF({ patients }: any) {

    const downloadPDF = () => {
        const doc = new jsPDF()

        const tableColumn = [
            "ID",
            "Name",
            "Age",
            "Medical Issue",
            "Phone",
            "Email",
            "Address"
        ]

        const tableRows: any[] = []

        patients.forEach((p: any) => {
            tableRows.push([
                p.patient_id,
                p.patient_name,
                p.age,
                p.medical_issue,
                p.contact?.[0]?.number || "-",
                p.contact?.[0]?.email || "-",
                p.contact?.[0]?.address || "-"
            ])
        })

        doc.text("Patient List", 14, 15)

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20
        })

        doc.save("patients.pdf")
    }

    return (
        <button
            onClick={downloadPDF}
            className="w-fit border border-[#8F8F8F] rounded-[5px] px-4 py-1 flex items-center justify-center gap-2 text-sm"
        >
            <Download size={14} />
             PDF
        </button>
    )
}