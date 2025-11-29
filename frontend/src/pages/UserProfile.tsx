import { useEffect, useState } from "react";
import { User, X, Mail, Phone, MapPin, Briefcase } from "lucide-react";
import { getUserApi } from "../api/user";

export interface UserProfileData {
  username?: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

interface GetUserResponse {
  success: boolean;
  message: string;
  data: UserProfileData;
}
interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const data: GetUserResponse = await getUserApi();
        setUser(data.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isOpen]);

  if (!isOpen) return null;
  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        Loading...
      </div>
    );
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="relative p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <User className="w-7 h-7" />
            User Profile
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <X className="w-5 h-5 text-white" />.
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-semibold text-gray-900 dark:text-white capitalize">
              {user.username}
            </h3>
            <p className="text-indigo-600 dark:text-indigo-400 text-lg mt-1">
              {user.email}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm">
              <Mail className="text-indigo-500 w-6 h-6" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="text-gray-900 dark:text-white break-all">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm">
              <Phone className="text-indigo-500 w-6 h-6" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p className="text-gray-900 dark:text-white">
                  {user.phone || "Not Provided"}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm">
              <MapPin className="text-indigo-500 w-6 h-6" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Address
                </p>
                <p className="text-gray-900 dark:text-white">
                  {user.address || "No Address"}
                </p>
              </div>
            </div>

            {/* User Type */}
            <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm">
              <Briefcase className="text-indigo-500 w-6 h-6" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Address
                </p>
                <p className="text-gray-900 dark:text-white">
                  {user.address || "No Address"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default UserProfile;
