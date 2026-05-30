export const Button = () => {
  return (
    <button
      type='submit'
      className='group relative mt-2 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(139,92,246,0.6)] transition-all hover:shadow-[0_0_32px_-4px_rgba(139,92,246,0.8)]'
    >
      <span className='flex items-center justify-center gap-2'>
        Generar mi ticket
        <svg className='h-4 w-4 transition-transform group-hover:translate-x-0.5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
          <line x1='5' y1='12' x2='19' y2='12' />
          <polyline points='12 5 19 12 12 19' />
        </svg>
      </span>
    </button>
  );
};
