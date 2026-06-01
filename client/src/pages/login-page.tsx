import { Link } from "react-router-dom";
import { LoginForm } from "../components/auth/login-form";

export const LoginPage = () => {
  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1"
            style={{
              background: "rgba(255,255,255,0.6)",
              borderColor: "rgba(15,23,42,0.06)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A00] shadow-[0_0_8px_rgba(255,122,0,0.8)]" />
            <span className="text-[10px] font-medium tracking-[0.25em] text-[#475569] uppercase">
              Acceso
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Bienvenido de nuevo</h1>
          <p className="mt-2 text-sm text-[#475569]">
            Ingresa con tus credenciales para acceder a tus eventos.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#FF7A00]/15 via-transparent to-[#FF4FD8]/15 blur-lg"
          />
          <div
            className="relative rounded-2xl border p-6 sm:p-8"
            style={{
              background: "rgba(255,255,255,0.65)",
              borderColor: "rgba(15,23,42,0.06)",
              backdropFilter: "blur(20px) saturate(140%)",
              WebkitBackdropFilter: "blur(20px) saturate(140%)",
              boxShadow:
                "0 20px 50px -20px rgba(15,23,42,0.18), 0 1px 0 0 rgba(255,255,255,0.9) inset",
            }}
          >
            <LoginForm />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-[#64748B]">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="font-medium text-[#FF4FD8] transition-colors hover:text-[#FF7A00]"
          >
            Registrate
          </Link>
        </p>
      </div>
    </section>
  );
};
