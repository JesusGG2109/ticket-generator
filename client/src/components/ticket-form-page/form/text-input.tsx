import { IconInfo } from '../../../assets/icon-info';

interface Props {
  label: string;
  placeholder: string;
  isError?: boolean;
  errorMessage?: string;
  type?: 'text' | 'email';
}

export const TextInput = ({
  label,
  placeholder,
  errorMessage = '',
  isError = false,
  type = 'text',
  ...rest
}: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <label
        className='text-[11px] font-semibold tracking-[0.2em] text-[#64748B] uppercase'
        htmlFor={label}
      >
        {label}
      </label>
      <input
        {...rest}
        id={label}
        type={type}
        placeholder={placeholder}
        className='rounded-xl border border-[rgba(15,23,42,0.08)] bg-white/70 px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none transition-all focus:border-[#FF7A00]/50 focus:bg-white/90 focus:ring-2 focus:ring-[#FF7A00]/15'
      />
      {isError && (
        <p className='flex items-center gap-1.5 text-xs text-rose-500'>
          <IconInfo />
          {errorMessage}
        </p>
      )}
    </div>
  );
};
