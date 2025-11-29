import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { registerSchema } from "../schemas/authSchema";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AxiosError } from "axios";
type RegisterForm = z.infer<typeof registerSchema>;

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data);
      navigate("/login");
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ message: string }>;

      alert(axiosErr.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-white">SignUp</h2>
        <p className="mt-4 text-gray-100 ">
          Already have an account ?{" "}
          <Link to="/login" className="text-red-400 text-lg">
            Login
          </Link>
        </p>
        <form className="mt-5 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username")}
            className="w-full rounded-lg bg-gray-700 text-white px-4 py-3"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-400 text-sm text-center">
              {errors.username.message}
            </p>
          )}

          <input
            {...register("email")}
            className="w-full rounded-lg bg-gray-700 text-white px-4 py-3"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-400 text-sm text-center">
              {errors.email.message}
            </p>
          )}

          <input
            {...register("password")}
            className="w-full rounded-lg bg-gray-700 text-white px-4 py-3"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-400 text-sm text-center">
              {errors.password.message}
            </p>
          )}

          <input
            {...register("phone")}
            className="w-full rounded-lg bg-gray-700 text-white px-4 py-3"
            placeholder="Phone"
          />
          {errors.phone && (
            <p className="text-red-400 text-sm text-center">
              {errors.phone.message}
            </p>
          )}

          <input
            {...register("address")}
            className="w-full rounded-lg bg-gray-700 text-white px-4 py-3"
            placeholder="Address"
          />
          {errors.address && (
            <p className="text-red-400 text-sm text-center">
              {errors.address.message}
            </p>
          )}

          <button
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}
