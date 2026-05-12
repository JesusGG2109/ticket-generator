import { IconInfo } from '../../../assets/icon-info';

interface Props {
  label: string;
  placeholder: string;
  isError?: boolean;
  errorMessage?: string;
  type?: 'text' | 'email'
}

export const TextInput = ({
    label, 
    placeholder,
    errorMessage='',
    isError=false,
    type='text', 
    ...rest
  }:Props) => {
  return (
    <div className='flex flex-col'>
      <label className='mb-3 text-xl' htmlFor={label}>{label}</label>
      <input 
        {...rest}
        id={label}
        type={type}
        placeholder={placeholder}
        className='border border-Neutral-300 rounded-xl h-[54px] px-4'
        />
        {
          isError && (
            <p className='flex gap-1 items-center text-Orange-500'>
              <IconInfo />
              {errorMessage}</p>
          )
        }
    </div>
  )
}
