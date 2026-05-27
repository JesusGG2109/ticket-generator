import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../../services/authService";
import { useAuthStore } from "../../store/auth";

interface RegisterInputs {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const { user, token } = await registerRequest(data);
      setAuth(user, token);
      navigate("/eventos");
    } catch (error: any) {
      const message =
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.message ||
        "Error al registrar usuario";
      setServerError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto bg-white/10 border border-white/20 rounded-xl p-6"
    >
      <div className="flex flex-col gap-1">
        <label className="text-white text-sm">Nombre</label>
        <input
          type="text"
          {...register("name", {
            required: "El nombre es requerido",
            minLength: { value: 2, message: "Minimo 2 caracteres" },
          })}
          className="bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white outline-none"
          placeholder="Tu nombre"
        />
        {errors.name && (
          <span className="text-red-300 text-xs">{errors.name.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-white text-sm">Correo</label>
        <input
          type="email"
          {...register("email", { required: "El correo es requerido" })}
          className="bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white outline-none"
          placeholder="correo@ejemplo.com"
        />
        {errors.email && (
          <span className="text-red-300 text-xs">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-white text-sm">Contrasena</label>
        <input
          type="password"
          {...register("password", {
            required: "La contrasena es requerida",
            minLength: { value: 6, message: "Minimo 6 caracteres" },
          })}
          className="bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white outline-none"
          placeholder="********"
        />
        {errors.password && (
          <span className="text-red-300 text-xs">
            {errors.password.message}
          </span>
        )}
      </div>

      {serverError && (
        <div className="bg-red-500/30 border border-red-400 text-red-100 rounded-lg px-3 py-2 text-sm">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold rounded-lg px-4 py-2"
      >
        {submitting ? "Creando..." : "Crear cuenta"}
      </button>
    </form>
  );
};
