import { Card } from "@/components/ui/card"
import { Patient } from "@/types/patient"
import { MapPin, Phone, Mail } from "lucide-react"

interface Props {
  patient: Patient
}

export default function PatientCard({ patient }: Props) {

  const contact = patient.contact?.[0]

  const firstLetter = patient.patient_name.charAt(0).toUpperCase()

  const issueColor = (issue: string) => {
    switch (issue?.toLowerCase()) {
      case "fever":
        return "bg-[#DC262666]  border border-[#ff0000]"
      case "headache":
        return "bg-[#F57C0B66]  border border-[#EA7100]"
      case "sore throat":
        return "bg-[#EAB30866]  border border-[#BA8D00]"
      case "sprained ankle":
        return "bg-[#10B98166]  border border-[#03A972]"
      case "rash":
        return "bg-[#EC489966]  border border-[#EC4899]"
      case "ear infection":
        return "bg-[#06B6D466]  border border-[#00A2BD]"
      default:
        return "bg-[#4A4A4A66]  border border-[#000000]"
    }
  }

  return (
    <Card className="overflow-hidden py-0 rounded-xl border shadow-sm hover:shadow-md transition">

      {/* HEADER */}
      <div className="flex items-center justify-between bg-[#B5D1FE82] px-3 py-4">

        <div className="flex items-center gap-2">

          {/* AVATAR */}
          <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold ${issueColor(patient.medical_issue)}`}>
            {firstLetter}
          </div>

          <div className="leading-tight">
            <p className="text-sm font-medium text-gray-800">
              {patient.patient_name}
            </p>

            <p className="text-[11px] text-gray-500">
              ID-{patient.patient_id}
            </p>
          </div>

        </div>

        {/* AGE */}
        <span className="text-[11px] bg-blue-500 text-white px-2 py-[2px] rounded-full">
          Age {patient.age}
        </span>

      </div>

      {/* BODY */}
      <div className="px-3 py-3">

        {/* ISSUE BADGE */}
        <span
          className={`inline-block text-[11px] text-black px-2 py-[2px] rounded mb-3 relative top-[-10px] ${issueColor(patient.medical_issue)}`}
        >
          {patient.medical_issue}
        </span>

        {/* DETAILS */}
        <div className="space-y-2 text-[12px] text-gray-600">

          <p className="flex items-center gap-2">
            <MapPin size={13} />
            {contact?.address ?? "N/A"}
          </p>

          <p className={`flex items-center gap-2 ${!contact?.number ? "text-red-500" : ""}`}>
            <Phone size={13} />
            {contact?.number ?? "N/A"}
          </p>

          <p className={`flex items-center gap-2 ${!contact?.email ? "text-red-500" : ""}`}>
            <Mail size={13} />
            {contact?.email ?? "N/A"}
          </p>

        </div>

      </div>

    </Card>
  )
}
