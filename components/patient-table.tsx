import { Patient } from "@/types/patient"

interface Props {
  patients: Patient[]
}

export default function PatientTable({ patients }: Props) {

  return (
    // <div className="border rounded-lg overflow-hidden">
<div className="overflow-x-auto border rounded-lg w-full max-w-8xl mx-auto ">
      <table className="w-full text-sm">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Issue</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Email</th>
          </tr>
        </thead>

        <tbody>

          {patients.map((p) => {

            const contact = p.contact[0]

            return (
              <tr key={p.patient_id} className="border-t">

                <td className="p-3">{p.patient_id}</td>

                <td className="p-3">{p.patient_name}</td>

                <td className="p-3">{p.age}</td>

                <td className="p-3">{p.medical_issue}</td>

                <td className="p-3">
                  {contact?.number ?? "N/A"}
                </td>

                <td className="p-3">
                  {contact?.email ?? "N/A"}
                </td>

              </tr>
            )
          })}

        </tbody>

      </table>

    </div>
  )
}