import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Patient } from "@/types/patient"

interface Props {
  patient: Patient
}

export default function PatientCard({ patient }: Props) {

  const contact = patient.contact[0]

  return (
    <Card className="p-4 shadow-md">

      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {patient.patient_name[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold">
              {patient.patient_name}
            </p>

            <p className="text-xs text-gray-500">
              ID-{patient.patient_id}
            </p>
          </div>
        </div>

        <Badge>
          Age {patient.age}
        </Badge>

      </div>

      <Badge variant="secondary" className="mb-3">
        {patient.medical_issue}
      </Badge>

      <div className="text-sm text-gray-600 space-y-1">

        <p>
          📍 {contact?.address}
        </p>

        <p>
          📞 {contact?.number ?? "N/A"}
        </p>

        <p>
          ✉️ {contact?.email ?? "N/A"}
        </p>

      </div>

    </Card>
  )
}