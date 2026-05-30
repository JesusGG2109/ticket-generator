import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createEvent, type EventInput } from "../../services/eventService";

interface Props {
  onCreated: () => void;
  onCancel: () => void;
}

type Inputs = EventInput;

export const EventForm = ({ onCreated, onCancel }: Props) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setServerError(null);
    setSubmitting(true);
    try {
      await createEvent({
        ...data,
        date: new Date(data.date).toISOString(),
      });
      reset();
      onCreated();
    } catch (error: any) {
      const message =
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.message ||
        "Error al crear evento";
      setServerError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative mb-8">
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#8B5CF6]/25 via-transparent to-[#22D3EE]/20 blur-md"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative rounded-2xl border border-white/[0.08] bg-[#0B1026]/60 p-6 backdrop-blur-xl sm:p-7"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5">
              <span className="h-1 w-1 rounded-full bg-[#22D3EE] shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              <span className="text-[9px] font-medium tracking-[0.25em] text-[#D1D5DB] uppercase">
                Nuevo evento
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">
              Registrar evento
            </h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-white/[0.08] bg-white/[0.03] p-2 text-[#94A3B8] transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            aria-label="Cerrar"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-[11px] font-semibold tracking-[0.2em] text-[#94A3B8] uppercase">
              Titulo
            </label>
            <input
              {...register("title", {
                required: "El titulo es requerido",
                minLength: { value: 3, message: "Minimo 3 caracteres" },
              })}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-[#94A3B8]/60 outline-none transition-all focus:border-[#8B5CF6]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#8B5CF6]/20"
              placeholder="Conferencia de IA aplicada"
            />
            {errors.title && (
              <span className="text-xs text-red-300">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-[11px] font-semibold tracking-[0.2em] text-[#94A3B8] uppercase">
              Descripcion
            </label>
            <textarea
              {...register("description", {
                required: "La descripcion es requerida",
                minLength: { value: 5, message: "Minimo 5 caracteres" },
              })}
              rows={3}
              className="resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-[#94A3B8]/60 outline-none transition-all focus:border-[#8B5CF6]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#8B5CF6]/20"
              placeholder="De que trata el evento, agenda, ponentes..."
            />
            {errors.description && (
              <span className="text-xs text-red-300">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-semibold tracking-[0.2em] text-[#94A3B8] uppercase">
              Ubicacion
            </label>
            <input
              {...register("location", {
                required: "La ubicacion es requerida",
              })}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-[#94A3B8]/60 outline-none transition-all focus:border-[#8B5CF6]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#8B5CF6]/20"
              placeholder="Auditorio TECNM Celaya"
            />
            {errors.location && (
              <span className="text-xs text-red-300">
                {errors.location.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-semibold tracking-[0.2em] text-[#94A3B8] uppercase">
              Fecha
            </label>
            <input
              type="datetime-local"
              {...register("date", { required: "La fecha es requerida" })}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-all focus:border-[#8B5CF6]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#8B5CF6]/20 [color-scheme:dark]"
            />
            {errors.date && (
              <span className="text-xs text-red-300">
                {errors.date.message}
              </span>
            )}
          </div>
        </div>

        {serverError && (
          <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-200 backdrop-blur-sm">
            {serverError}
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_-6px_rgba(139,92,246,0.6)] transition-all hover:shadow-[0_0_28px_-4px_rgba(139,92,246,0.8)] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none sm:px-6"
          >
            {submitting ? "Creando..." : "Crear evento"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[#D1D5DB] transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
