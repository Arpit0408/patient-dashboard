import { Patient } from "@/types/patient"
import { ChevronRight } from "lucide-react"

interface Props {
  patients: Patient[]
}

export default function PatientTable({ patients }: Props) {

  const issueColor = (issue: string) => {
    switch (issue?.toLowerCase()) {
      case "fever":
        return "bg-red-100  border border-red-300"

      case "headache":
        return "bg-orange-100 border border-orange-300"

      case "sore throat":
        return "bg-yellow-100  border border-yellow-300"

      case "sprained ankle":
        return "bg-green-100  border border-green-300"

      case "rash":
        return "bg-pink-100  border border-pink-300"

      case "ear infection":
        return "bg-blue-100  border border-blue-300"

      default:
        return "bg-gray-100  border border-gray-300"
    }

  }

  return (
    <div className="overflow-x-auto  rounded-none w-full">

      <table className="w-full text-sm">

        {/* HEADER */}
        <thead className="p-2 text-blue-600">
          <tr className="text-left">
            <th className=" p-2">ID</th>
            <th className=" p-2">Name</th>
            <th className=" p-2">Age</th>
            <th className=" p-2">Medical Issue</th>
            <th className=" p-2">Address</th>
            <th className=" p-2">Phone Number</th>
            <th className=" p-2">Email ID</th>
            <th className=" p-2"></th>
          </tr>
        </thead>

        <tbody>

          {patients.map((p) => {

            const contact = p.contact?.[0]
            const firstLetter = p.patient_name.charAt(0).toUpperCase()

            return (
              <tr key={p.patient_id} className="border-t hover:bg-gray-50">

                {/* ID */}
                <td className=" p-2 text-gray-600">
                  ID-{p.patient_id}
                </td>

                {/* NAME + AVATAR */}
                <td className=" p-2 flex items-center gap-3">

                  <div className={`w-7 h-7 text-black flex items-center justify-center rounded-full ${issueColor(p.medical_issue)} font-semibold text-sm`}>
                    {firstLetter}
                  </div>

                  <span className="font-medium text-gray-800">
                    {p.patient_name}
                  </span>

                </td>

                {/* AGE */}
                <td className=" p-2 text-gray-600">
                  {p.age}
                </td>

                {/* MEDICAL ISSUE BADGE */}
                <td className=" p-2">
                  <span className={`px-2 py-1 text-xs rounded-[5px] font-[2rem] ${issueColor(p.medical_issue)}`}>
                    {p.medical_issue}
                  </span>
                </td>

                {/* ADDRESS */}
                <td className=" p-2 text-gray-600">
                  {contact?.address ?? "N/A"}
                </td>

                {/* PHONE */}
                <td className={` p-2 ${!contact?.number ? "text-red-500" : "text-gray-600"}`}>
                  {contact?.number ?? "N/A"}
                </td>

                {/* EMAIL */}
                <td className={` p-2 ${!contact?.email ? "text-red-500" : "text-gray-600"}`}>
                  {contact?.email ?? "N/A"}
                </td>

                {/* ARROW */}
                <td className=" p-2 text-gray-400">
                  <ChevronRight size={18} />
                </td>

              </tr>
            )
          })}

        </tbody>

      </table>

    </div>
  )
}
