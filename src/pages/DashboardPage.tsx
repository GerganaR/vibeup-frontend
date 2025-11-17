// Dashboard page - protected route example
import { useAuth, UserProfile, LogoutButton } from "@/features/auth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center gap-4">
              <UserProfile showEmail={true} />
              <LogoutButton className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                Logout
              </LogoutButton>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome back, {user?.name}!</h2>
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            {user?.provider && (
              <p>
                <strong>Provider:</strong> {user.provider.charAt(0).toUpperCase() + user.provider.slice(1)}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

