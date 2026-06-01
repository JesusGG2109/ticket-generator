import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createEvent, type EventInput } from "../../services/eventService";

interface Props {
  onCreated: () => void;
  onCancel: () => void;
}

type Inputs = EventInput;

const INPUT =
  "rounded-xl border border-[rgba(15,23,42,0.08)] bg-white/70 px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none transition-all focus:border-[#FF7A00]/50 focus:bg-white/90 focus:ring-2 focus:ring-[#FF7A00]/15";

const LABEL =
  "text-[11px] font-semibold tracking-[0.2em] text-[#64748B] uppercase";

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
        className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#FF7A00]/15 via-transparent to-[#FF4FD8]/15 blur-lg"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative rounded-2xl border border-[rgba(15,23,42,0.06)] bg-white/65 p-6 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.18),0_1px_0_0_rgba(255,255,255,0.9)_inset] backdrop-blur-xl sm:p-7"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-[rgba(15,23,42,0.06)] bg-white/60 px-2.5 py-0.5">
              <span className="h-1 w-1 rounded-full bg-[#FF7A00] shadow-[0_0_6px_rgba(255,122,0,0.8)]" />
              <span className="text-[9px] font-medium tracking-[0.25em] text-[#475569] uppercase">
                Nuevo evento
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#0F172A]">
              Registrar evento
            </h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-[rgba(15,23,42,0.06)] bg-white/60 p-2 text-[#64748B] transition-colors hover:border-[rgba(15,23,42,0.12)] hover:bg-white/80 hover:text-[#0F172A]"
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
            <label className={LABEL}>Titulo</label>
            <input
              {...register("title", {
                required: "El titulo es requerido",
                minLength: { value: 3, message: "Minimo 3 caracteres" },
              })}
              className={INPUT}
              placeholder="Conferencia de IA aplicada"
            />
            {errors.title && (
              <span className="text-xs text-rose-500">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className={LABEL}>Descripcion</label>
            <textarea
              {...register("description", {
                required: "La descripcion es requerida",
                minLength: { value: 5, message: "Minimo 5 caracteres" },
              })}
              rows={3}
              className={`resize-none ${INPUT}`}
              placeholder="De que trata el evento, agenda, ponentes..."
            />
            {errors.description && (
              <span className="text-xs text-rose-500">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={LABEL}>Ubicacion</label>
            <input
              {...register("location", {
                required: "La ubicacion es requerida",
              })}
              className={INPUT}
              placeholder="Auditorio TECNM Celaya"
            />
            {errors.location && (
              <span className="text-xs text-rose-500">
                {errors.location.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={LABEL}>Fecha</label>
            <input
              type="datetime-local"
              {...register("date", { required: "La fecha es requerida" })}
              className={INPUT}
            />
            {errors.date && (
              <span className="text-xs text-rose-500">
                {errors.date.message}
              </span>
            )}
          </div>
        </div>

        {serverError && (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-2.5 text-xs text-rose-700 backdrop-blur-sm">
            {serverError}
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF4FD8] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(255,122,0,0.55),0_1px_0_0_rgba(255,255,255,0.32)_inset] transition-all hover:shadow-[0_12px_40px_-6px_rgba(255,122,0,0.75),0_1px_0_0_rgba(255,255,255,0.4)_inset] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none sm:px-6"
          >
            {submitting ? "Creando..." : "Crear evento"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-[rgba(15,23,42,0.08)] bg-white/60 px-4 py-2.5 text-sm font-medium text-[#475569] transition-colors hover:border-[rgba(15,23,42,0.16)] hover:bg-white/80 hover:text-[#0F172A]"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
