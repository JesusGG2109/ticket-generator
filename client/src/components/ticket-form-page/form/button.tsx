interface Props {
  submitting?: boolean
}

export const Button = ({ submitting = false }: Props) => {
  return (
    <button
      type='submit'
      disabled={submitting}
      className='group relative mt-2 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF4FD8] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_10px_36px_-8px_rgba(255,122,0,0.55),0_1px_0_0_rgba(255,255,255,0.32)_inset] transition-all hover:shadow-[0_14px_44px_-6px_rgba(255,122,0,0.75),0_1px_0_0_rgba(255,255,255,0.4)_inset] disabled:cursor-not-allowed disabled:opacity-60'
    >
      <span className='flex items-center justify-center gap-2'>
        {submitting && (
          <span className='h-2 w-2 animate-pulse rounded-full bg-white' />
        )}
        {submitting ? 'Emitiendo ticket...' : 'Generar mi ticket'}
        {!submitting && (
          <svg
            className='h-4 w-4 transition-transform group-hover:translate-x-0.5'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='5' y1='12' x2='19' y2='12' />
            <polyline points='12 5 19 12 12 19' />
          </svg>
        )}
      </span>
    </button>
  )
}
