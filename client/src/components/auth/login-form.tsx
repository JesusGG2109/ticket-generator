import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services/authService";
import { useAuthStore } from "../../store/auth";

interface LoginInputs {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const { user, token } = await loginRequest(data);
      setAuth(user, token);
      navigate("/eventos");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Error al iniciar sesion";
      setServerError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-semibold tracking-[0.2em] text-[#94A3B8] uppercase">
          Correo
        </label>
        <input
          type="email"
          autoComplete="email"
          {...register("email", { required: "El correo es requerido" })}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#94A3B8]/60 outline-none transition-all focus:border-[#8B5CF6]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#8B5CF6]/20"
          placeholder="correo@ejemplo.com"
        />
        {errors.email && (
          <span className="text-xs text-red-300">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-semibold tracking-[0.2em] text-[#94A3B8] uppercase">
          Contrasena
        </label>
        <input
          type="password"
          autoComplete="current-password"
          {...register("password", { required: "La contrasena es requerida" })}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#94A3B8]/60 outline-none transition-all focus:border-[#8B5CF6]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#8B5CF6]/20"
          placeholder="••••••••"
        />
        {errors.password && (
          <span className="text-xs text-red-300">{errors.password.message}</span>
        )}
      </div>

      {serverError && (
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs text-red-200 backdrop-blur-sm">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="group relative mt-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(139,92,246,0.6)] transition-all hover:shadow-[0_0_32px_-4px_rgba(139,92,246,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="flex items-center justify-center gap-2">
          {submitting && (
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          )}
          {submitting ? "Verificando acceso..." : "Iniciar sesion"}
        </span>
      </button>
    </form>
  );
};
