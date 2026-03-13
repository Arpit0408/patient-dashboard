export default function PatientTableSkeleton() {
  return (
    <div className="overflow-x-auto border rounded-lg w-full max-w-6xl mx-auto animate-pulse">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            {["ID","Name","Age","Issue","Phone","Email"].map((_, i) => (
              <th key={i} className="p-3">
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, i) => (
            <tr key={i} className="border-t">
              {Array.from({ length: 6 }).map((_, j) => (
                <td key={j} className="p-3">
                  <div className="h-3 bg-gray-300 rounded w-5/6 mx-auto"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}