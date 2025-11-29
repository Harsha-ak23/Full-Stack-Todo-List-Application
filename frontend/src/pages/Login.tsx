import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { loginSchema } from "../schemas/authSchema";
import { loginUser } from "../api/auth";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AxiosError } from "axios";

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await loginUser(data);
      setAuth(res.token, res.data);
      navigate("/");
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ message: string }>;
      alert(axiosErr.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>
        <p className="mt-4 text-gray-100 ">
          Don't have account ?{" "}
          <Link to="/signup" className="text-red-400 text-lg">
            SignUp
          </Link>
        </p>
        <form className="mt-5 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full rounded-lg bg-gray-700 text-white px-4 py-3"
          />
          {errors.email && <p className="err">{errors.email.message}</p>}

          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="w-full rounded-lg bg-gray-700 text-white px-4 py-3"
          />
          {errors.password && <p className="err">{errors.password.message}</p>}

          <button
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
