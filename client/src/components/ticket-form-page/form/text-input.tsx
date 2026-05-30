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
        className='text-[11px] font-semibold tracking-[0.2em] text-[#94A3B8] uppercase'
        htmlFor={label}
      >
        {label}
      </label>
      <input
        {...rest}
        id={label}
        type={type}
        placeholder={placeholder}
        className='rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#94A3B8]/60 outline-none transition-all focus:border-[#8B5CF6]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#8B5CF6]/20'
      />
      {isError && (
        <p className='flex items-center gap-1.5 text-xs text-red-300'>
          <IconInfo />
          {errorMessage}
        </p>
      )}
    </div>
  );
};
