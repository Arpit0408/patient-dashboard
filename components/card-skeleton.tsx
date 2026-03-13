export default function PatientCardSkeleton() {
  return (
    <div className="p-4 shadow-md animate-pulse border rounded-md">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
      <div className="space-y-1">
        <div className="h-3 bg-gray-300 rounded"></div>
        <div className="h-3 bg-gray-300 rounded"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  )
}