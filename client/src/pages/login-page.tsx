import { Link } from "react-router-dom";
import { LoginForm } from "../components/auth/login-form";

export const LoginPage = () => {
  return (
    <section className="mt-10 flex flex-col gap-6">
      <h2 className="text-white text-2xl font-bold text-center">
        Iniciar sesion
      </h2>

      <LoginForm />

      <p className="text-white text-sm text-center">
        No tienes cuenta?{" "}
        <Link to="/register" className="underline text-orange-300">
          Registrate
        </Link>
      </p>
    </section>
  );
};
