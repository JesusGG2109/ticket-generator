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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-semibold tracking-[0.2em] text-[#94A3B8] uppercase">
          Nombre
        </label>
        <input
          type="text"
          autoComplete="name"
          {...register("name", {
            required: "El nombre es requerido",
            minLength: { value: 2, message: "Minimo 2 caracteres" },
          })}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#94A3B8]/60 outline-none transition-all focus:border-[#8B5CF6]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#8B5CF6]/20"
          placeholder="Tu nombre completo"
        />
        {errors.name && (
          <span className="text-xs text-red-300">{errors.name.message}</span>
        )}
      </div>

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
          autoComplete="new-password"
          {...register("password", {
            required: "La contrasena es requerida",
            minLength: { value: 6, message: "Minimo 6 caracteres" },
          })}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#94A3B8]/60 outline-none transition-all focus:border-[#8B5CF6]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#8B5CF6]/20"
          placeholder="Minimo 6 caracteres"
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
        className="group relative mt-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_36px_-8px_rgba(139,92,246,0.6),0_1px_0_0_rgba(255,255,255,0.18)_inset] transition-all hover:shadow-[0_14px_44px_-6px_rgba(139,92,246,0.8),0_1px_0_0_rgba(255,255,255,0.22)_inset] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="flex items-center justify-center gap-2">
          {submitting && (
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          )}
          {submitting ? "Creando cuenta..." : "Crear cuenta"}
        </span>
      </button>
    </form>
  );
};
