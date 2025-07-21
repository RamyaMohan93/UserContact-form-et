import dynamic from 'next/dynamic'

const AdminDashboardContent = dynamic(() => import('@/components/admin-dashboard-content'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="h-8 w-64 mb-2 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-96 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-6">
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

export default function AdminDashboardPage() {
  return <AdminDashboardContent />
}