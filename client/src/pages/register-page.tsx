import { Link } from "react-router-dom";
import { RegisterForm } from "../components/auth/register-form";

export const RegisterPage = () => {
  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-[rgba(12,16,36,0.55)] px-3 py-1 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
            <span className="text-[10px] font-medium tracking-[0.25em] text-[#D1D5DB] uppercase">
              Nueva cuenta
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white">Crea tu cuenta</h1>
          <p className="mt-2 text-sm text-[#94A3B8]">
            Empieza a generar tickets y a gestionar eventos en segundos.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 via-transparent to-[#22D3EE]/15 blur-lg"
          />
          <div className="relative rounded-2xl border border-white/[0.07] bg-[rgba(12,16,36,0.55)] p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55),0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur-xl sm:p-8">
            <RegisterForm />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-[#94A3B8]">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="font-medium text-[#22D3EE] transition-colors hover:text-[#60A5FA]"
          >
            Inicia sesion
          </Link>
        </p>
      </div>
    </section>
  );
};
