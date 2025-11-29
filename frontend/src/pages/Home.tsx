import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/useAuthStore";
import TodoItem from "../components/TodoItem";
import {
  getTodos,
  createTodo,
  isCompletedTodo,
  deleteTodo,
  updateTodo,
} from "../api/todo";
import type { Todo } from "../api/todo";
import AddTodoModal from "./AddTodo";
import type { CreateTodoType } from "../schemas/todoSchema";
import EditTodoModal from "./EditTodo";

const Home = () => {
  const { token } = useAuthStore();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditOpen(true);
  };

  // ---------- Fetch Todos ----------
  useEffect(() => {
    if (!token) return;

    const loadTodos = async () => {
      try {
        const res = await getTodos(token);
        setTodos(res.data); // OR res.data.data based on backend
      } catch (err) {
        console.error("Failed to load todos:", err);
      }
    };

    loadTodos();
  }, [token]);

  // ---------- Add Todo ----------
  const handleAddTodo = async (data: CreateTodoType) => {
    if (!token) return;

    try {
      await createTodo(token, data);

      const res = await getTodos(token);
      setTodos(res.data);

      setIsAddOpen(false);
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  // ---------- Toggle Complete ----------
  const handleOnToggleComplete = async (_id: string, isCompleted: boolean) => {
    if (!token) return;

    try {
      await isCompletedTodo(token, _id, isCompleted);

      const res = await getTodos(token);
      setTodos(res.data);
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };
  const handleDelete = async (_id: string) => {
    if (!token) return;

    try {
      await deleteTodo(token, _id);

      const res = await getTodos(token);
      setTodos(res.data);
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  const handleUpdateTodo = async (id: string, data: CreateTodoType) => {
    if (!token) return;
    try {
      await updateTodo(token, id, data);
      const res = await getTodos(token);
      setTodos(res.data);
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="m-5">
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Todo
        </button>
      </div>

      <div className="m-5 p-5">
        {todos.length === 0 ? (
          <p className="text-gray-600">No todos found.</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggleComplete={handleOnToggleComplete}
              deleteTodo={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>

      <AddTodoModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmitAdd={handleAddTodo}
      />
      <EditTodoModal
        isOpen={isEditOpen}
        todo={editingTodo}
        onClose={() => setIsEditOpen(false)}
        onSubmitEdit={handleUpdateTodo}
      />
    </>
  );
};

export default Home;
