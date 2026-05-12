import type { ChangeEvent } from 'react'

interface Props {
  url: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const UploadInput = ({
  onChange, 
  url='',
}: Props) => {

  

  return (
    <div className='mb-4'>
      <p className='mb-4 text-xl'>Upload Avatar</p>
      <label className='border-3 border-dashed px-4 py-3 block w-full border-Neutral-0 bg-Neutral-700/50 hover:bg-Neutral-700 rounded-xl cursor-pointer mb-2'>
        <div className='bg-Neutral-700 size-[50px] grid place-content-center rounded-xl border-2 border-Neutral-500 mb-2 mx-auto overflow-hidden'>

          <img src={url == '' ? '/assets/images/icon-upload.svg': url} alt="icon upload" />

        </div>

        <input className='hidden' type="file" onChange={onChange} />
        
        <span className='text-center block text-gray-500 text-sm'>Drag and drop or click to upload</span>
      </label>
      <div className='flex gap-2'>
        <img src="/assets/images/icon-info.svg" alt="icon info" />
        <p>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
      </div>
    </div>
  )
}
