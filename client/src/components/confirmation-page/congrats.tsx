import { useUserStore } from '../../store/user';

export const Congrats = () => {
  const store = useUserStore();
  const { fullName, email } = store;

  const name = fullName.split(' ')[0];
  const lastName = fullName.split(' ')[1] || '';

  return (
    <>
      <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 backdrop-blur-sm'>
        <span className='h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' />
        <span className='text-[10px] font-medium tracking-[0.25em] text-[#D1D5DB] uppercase'>
          Ticket emitido
        </span>
      </div>

      <h1 className='text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl'>
        <span className='bg-gradient-to-br from-white to-[#D1D5DB] bg-clip-text text-transparent'>
          Felicidades,{' '}
        </span>
        <span className='bg-gradient-to-r from-[#8B5CF6] via-[#60A5FA] to-[#22D3EE] bg-clip-text text-transparent'>
          {name} {lastName}
        </span>
        <span className='bg-gradient-to-br from-white to-[#D1D5DB] bg-clip-text text-transparent'>
          .
        </span>
      </h1>

      <p className='mx-auto mt-4 max-w-xl text-base text-[#94A3B8]'>
        Tu ticket esta listo. Enviamos una copia a{' '}
        <span className='font-medium text-[#22D3EE]'>{email}</span> y te haremos
        llegar actualizaciones previas al evento.
      </p>
    </>
  );
};
