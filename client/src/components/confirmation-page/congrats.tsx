import { useUserStore } from '../../store/user';

export const Congrats = () => {
  const store = useUserStore();
  const { fullName, email } = store;

  const name = fullName.split(' ')[0];
  const lastName = fullName.split(' ')[1] || '';

  return (
    <>
      <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(15,23,42,0.06)] bg-white/60 px-3 py-1 backdrop-blur-xl'>
        <span className='h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]' />
        <span className='text-[10px] font-medium tracking-[0.25em] text-[#475569] uppercase'>
          Ticket emitido
        </span>
      </div>

      <h1 className='text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl'>
        <span className='text-[#0F172A]'>
          Felicidades,{' '}
        </span>
        <span
          className='bg-clip-text text-transparent'
          style={{
            backgroundImage:
              'linear-gradient(90deg, #FF7A00 0%, #FF4FD8 100%)',
          }}
        >
          {name} {lastName}
        </span>
        <span className='text-[#0F172A]'>.</span>
      </h1>

      <p className='mx-auto mt-4 max-w-xl text-base text-[#475569]'>
        Tu ticket esta listo. Enviamos una copia a{' '}
        <span className='font-medium text-[#FF4FD8]'>{email}</span> y te haremos
        llegar actualizaciones previas al evento.
      </p>
    </>
  );
};
