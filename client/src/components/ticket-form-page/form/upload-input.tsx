import type { ChangeEvent } from 'react';

interface Props {
  url: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const UploadInput = ({ onChange, url = '' }: Props) => {
  return (
    <div className='mb-6 flex flex-col gap-2'>
      <p className='text-[11px] font-semibold tracking-[0.2em] text-[#94A3B8] uppercase'>
        Avatar
      </p>

      <label className='group relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-dashed border-white/[0.14] bg-white/[0.02] px-4 py-6 transition-all hover:border-[#8B5CF6]/40 hover:bg-white/[0.04]'>
        <div className='relative grid h-14 w-14 place-content-center overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-[#0B1026] to-[#121A3A]'>
          {url ? (
            <img
              src={url}
              alt='Avatar preview'
              className='h-full w-full object-cover'
            />
          ) : (
            <svg
              className='h-6 w-6 text-[#8B5CF6]'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
              <polyline points='17 8 12 3 7 8' />
              <line x1='12' y1='3' x2='12' y2='15' />
            </svg>
          )}
        </div>

        <input className='hidden' type='file' accept='image/*' onChange={onChange} />

        <span className='text-center text-xs text-[#94A3B8]'>
          {url ? 'Imagen cargada — click para reemplazar' : 'Arrastra o haz click para subir'}
        </span>
      </label>

      <p className='flex items-center gap-1.5 text-[11px] text-[#94A3B8]/80'>
        <svg className='h-3 w-3' viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth='1.5'>
          <circle cx='8' cy='8' r='6' />
          <path d='M8 11V8M8 5.5V5.4' strokeLinecap='round' />
        </svg>
        SVG, PNG, JPG o GIF — maximo 800×400px
      </p>
    </div>
  );
};
