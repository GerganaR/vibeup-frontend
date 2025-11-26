import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAppSelector } from "@/store/hooks";
import { Spinner } from "@material-tailwind/react";

export default function HomePage() {
  const { logout, token } = useAuth();
  const { user, loading, error } = useAppSelector((state) => state.user);
  if (loading) return <Spinner className="w-10 h-10" />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome Home!</h1>

        {user ? (
          <>
            <img
              src={user.avatarUrl}
              alt="User avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <p className="text-lg font-medium">{user.name}</p>
            <p className="text-sm text-gray-500 mb-6">{user.email}</p>
            <p className="text-sm text-gray-500 mb-6">{token}</p>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-700">You are not logged in.</p>
        )}
      </div>
    </div>
  );
}
