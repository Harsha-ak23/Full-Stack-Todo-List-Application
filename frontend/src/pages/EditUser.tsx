import { X, User, Mail, Phone, LocationEdit } from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "../schemas/authSchema";
import type { EditUserFormType } from "../schemas/authSchema";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitUpdate: (data: EditUserFormType) => Promise<void>;
}

export default function EditUserModal({
  isOpen,
  onClose,
  onSubmitUpdate,
}: EditUserModalProps) {
  const user = useAuthStore((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormType>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });

  // Load user values when modal opens
  useEffect(() => {
    if (isOpen && user) {
      reset({
        username: user.username,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [isOpen, user, reset]);

  // ESC key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  // Final submission function
  const submitHandler = async (data: EditUserFormType) => {
    await onSubmitUpdate(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 animate-slideUp">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />.
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-center text-white">
            <h1 className="text-2xl font-bold">Edit User Details</h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="p-6 space-y-5"
          >
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  {...register("username")}
                  placeholder="Enter name"
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:border-purple-500 outline-none text-gray-900 dark:text-white"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter email"
                  disabled
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:border-purple-500 outline-none text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  {...register("phone")}
                  placeholder="Enter phone number"
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:border-purple-500 outline-none text-gray-900 dark:text-white"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <div className="relative">
                <LocationEdit className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  {...register("address")}
                  placeholder="Enter your address"
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:border-purple-500 outline-none text-gray-900 dark:text-white"
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-lg hover:scale-[1.02] transition shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.25s ease-out; }

        @keyframes fadeIn {
          from { opacity: 0; } 
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
