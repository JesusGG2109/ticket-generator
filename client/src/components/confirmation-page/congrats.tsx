import { useUserStore } from '../../store/user';

export const Congrats = () => {

  const store = useUserStore()

  const {fullName, email} = store

  const name = fullName.split(" ")[0];
  const lastName = fullName.split(" ")[1];

  return (
    <>
      <p className='text-[30px]/8 text-center font-extrabold mb-6'>Congrats, 
      <span className='bg-linear-to-r from-Orange-500 to-Neutral-0 bg-clip-text text-transparent'> {name} </span> 
      <span className='bg-linear-to-r from-Orange-500 to-Neutral-0 bg-clip-text text-transparent'>{lastName}! </span> 
      Your ticket is ready.</p>

      <p className='text-[19px] text-center mb-20 text-Neutral-300'>We've emailed your ticket to <span className='text-Orange-500'>{email}</span> and will send updates in the run up to the event.</p>
    </>
  )
}
