import React from "react";
import type { Todo as TodoType } from "../api/todo";
import { Check, Trash2, Edit } from "lucide-react";

interface TodoProps {
  todo: TodoType;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onEdit: (todo: TodoType) => void;
  deleteTodo: (id: string) => void; // FIXED TYPE
}

const TodoItem: React.FC<TodoProps> = ({
  todo,
  onToggleComplete,
  onEdit,
  deleteTodo,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <div className="flex-1">
        <h3
          className={`text-lg font-semibold ${
            todo.isCompleted
              ? "line-through text-gray-400"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {todo.title}
        </h3>

        {todo.description && (
          <p
            className={`mt-1 text-sm ${
              todo.isCompleted
                ? "line-through text-gray-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {todo.description}
          </p>
        )}
      </div>

      <div className="flex mt-3 sm:mt-0 sm:ml-4 gap-2">
        <button
          onClick={() => onToggleComplete(todo._id, !todo.isCompleted)}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg border ${
            todo.isCompleted
              ? "border-green-500 bg-green-100 text-green-700 hover:bg-green-200"
              : "border-gray-400 bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition`}
        >
          <Check className="w-4 h-4" />
          {todo.isCompleted ? "Completed" : "Complete ?"}
        </button>

        <button
          onClick={() => onEdit(todo)}
          className="flex items-center gap-1 px-3 py-1 rounded-lg border border-blue-500 bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>

        <button
          onClick={() => deleteTodo(todo._id)} // FIXED HERE
          className="flex items-center gap-1 px-3 py-1 rounded-lg border border-red-500 bg-red-100 text-red-700 hover:bg-red-200 transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
