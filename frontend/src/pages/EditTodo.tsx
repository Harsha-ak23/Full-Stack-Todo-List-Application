import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodoSchema } from "../schemas/todoSchema";
import type { CreateTodoType } from "../schemas/todoSchema";
import type { Todo } from "../api/todo";

interface EditTodoModalProps {
  isOpen: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSubmitEdit: (id: string, data: CreateTodoType) => Promise<void>;
}

export default function EditTodoModal({
  isOpen,
  todo,
  onClose,
  onSubmitEdit,
}: EditTodoModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTodoType>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // Pre-fill form when modal opens or todo changes
  useEffect(() => {
    if (isOpen && todo) {
      reset({
        title: todo.title,
        description: todo.description || "",
      });
    }
  }, [isOpen, todo, reset]);

  // ESC close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen || !todo) return null;

  const submitHandler = async (data: CreateTodoType) => {
    await onSubmitEdit(todo._id, data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl mx-4 animate-slideUp">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />.
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-center text-white">
            <h1 className="text-2xl font-bold">Edit Todo</h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="p-6 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  {...register("title")}
                  placeholder="Todo title"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:border-purple-500 outline-none text-gray-900 dark:text-white"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <input
                  {...register("description")}
                  placeholder="Todo description"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:border-purple-500 outline-none text-gray-900 dark:text-white"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-lg hover:scale-[1.02] transition shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update Todo"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.25s ease-out; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}
