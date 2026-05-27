import { Link } from "react-router-dom";
import { RegisterForm } from "../components/auth/register-form";

export const RegisterPage = () => {
  return (
    <section className="mt-10 flex flex-col gap-6">
      <h2 className="text-white text-2xl font-bold text-center">
        Crear cuenta
      </h2>

      <RegisterForm />

      <p className="text-white text-sm text-center">
        Ya tienes cuenta?{" "}
        <Link to="/login" className="underline text-orange-300">
          Inicia sesion
        </Link>
      </p>
    </section>
  );
};
