import { useUserStore } from '../../store/user'

export const Ticket = () => {

  const store = useUserStore()

  const {fullName, githubUser, url} = store;

  return (
    <div className='h-40 w-[342px] flex flex-col justify-between p-4 bg-[url(/assets/images/pattern-ticket.svg)] bg-contain bg-no-repeat relative sm:h-50 sm:w-[420px] md:h-[260px] md:w-[560px] mx-auto'>
      <div>
        <img src="/assets/images/logo-full.svg" alt="logo" />
        <p className='md:text-2xl'>Jan 31, 2025 / Austing, TX</p>
      </div>

      <div className='flex gap-3 items-center'>
        <img
          alt="image avatar"
          src={url} 
          className='size-[45px] rounded-lg'
        />
        <div>
          <p className='text-xl font-medium md:text-2xl'>{fullName}</p>
          <div className='flex'>
            <img src="/assets/images/icon-github.svg" alt="" />
            <p className='md:text-2xl'>{githubUser}</p>
          </div>
        </div>
      </div>
      <p className='text-2xl absolute top-1/2 right-0 transform -translate-y-1/2 rotate-90 text-Neutral-500'>#01609</p>
    </div>
  )
}
