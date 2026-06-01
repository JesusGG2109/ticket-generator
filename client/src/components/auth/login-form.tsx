import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services/authService";
import { useAuthStore } from "../../store/auth";

interface LoginInputs {
  email: string;
  password: string;
}

const inputClass =
  "rounded-xl border border-[rgba(15,23,42,0.08)] bg-white/70 px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none transition-all focus:border-[#FF7A00]/50 focus:bg-white/90 focus:ring-2 focus:ring-[#FF7A00]/15";

const labelClass =
  "text-[11px] font-semibold tracking-[0.2em] text-[#64748B] uppercase";

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
        <label className={labelClass}>Correo</label>
        <input
          type="email"
          autoComplete="email"
          {...register("email", { required: "El correo es requerido" })}
          className={inputClass}
          placeholder="correo@ejemplo.com"
        />
        {errors.email && (
          <span className="text-xs text-rose-500">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>Contrasena</label>
        <input
          type="password"
          autoComplete="current-password"
          {...register("password", { required: "La contrasena es requerida" })}
          className={inputClass}
          placeholder="••••••••"
        />
        {errors.password && (
          <span className="text-xs text-rose-500">{errors.password.message}</span>
        )}
      </div>

      {serverError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-xs text-rose-700 backdrop-blur-sm">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="group relative mt-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF4FD8] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_36px_-8px_rgba(255,122,0,0.55),0_1px_0_0_rgba(255,255,255,0.32)_inset] transition-all hover:shadow-[0_14px_44px_-6px_rgba(255,122,0,0.75),0_1px_0_0_rgba(255,255,255,0.4)_inset] disabled:cursor-not-allowed disabled:opacity-60"
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
