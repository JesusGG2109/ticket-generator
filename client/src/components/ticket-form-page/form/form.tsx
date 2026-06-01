import { UploadInput } from './upload-input'
import { TextInput } from './text-input'
import { Button } from './button'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useShowTicket } from '../../../hooks/use-show-ticket'
import { useUserStore } from '../../../store/user'
import { useState, type ChangeEvent } from 'react'
import { createTicket } from '../../../services/ticketService'

type Inputs = {
  fullName: string
  email: string
  githubUser: string
}

/**
 * Convierte un File a data URL (base64) — serializable y persistible en backend.
 * No usamos URL.createObjectURL porque devuelve blob URLs efimeras del navegador.
 */
const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

export const Form = () => {
  const [imageDataUrl, setImageDataUrl] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>()

  const context = useShowTicket()
  const userStore = useUserStore()

  const sendForm: SubmitHandler<Inputs> = async (data) => {
    const { email, fullName, githubUser } = data

    setSubmitting(true)
    setServerError(null)

    try {
      await createTicket({
        name: fullName,
        email,
        github: githubUser || null,
        avatar: imageDataUrl || null,
      })

      userStore.setUser({
        email,
        fullName,
        githubUser,
        url: imageDataUrl,
      })

      context.setShowTicket(true)
    } catch (error: any) {
      const message =
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.message ||
        'Error al generar ticket'
      setServerError(message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const dataUrl = await fileToDataUrl(file)
      setImageDataUrl(dataUrl)
    } catch {
      setServerError('No se pudo procesar la imagen')
    }
  }

  return (
    <div className='relative'>
      <div
        aria-hidden='true'
        className='absolute -inset-px rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 via-transparent to-[#22D3EE]/15 blur-lg'
      />
      <form
        className='relative rounded-2xl border border-white/[0.07] bg-[rgba(12,16,36,0.55)] p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55),0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur-xl sm:p-8'
        onSubmit={handleSubmit(sendForm)}
      >
        <UploadInput url={imageDataUrl} onChange={handleChange} />
        <div className='flex flex-col gap-5'>
          <TextInput
            {...register('fullName', { required: 'Full Name is required' })}
            label='Full Name'
            placeholder='Jonathan Kirstof'
            isError={errors.fullName?.type === 'required'}
            errorMessage={errors.fullName?.message}
          />
          <TextInput
            {...register('email', {
              required: 'Email is required',
              pattern:
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
            })}
            label='Email Address'
            placeholder='jonatan@email.com'
            type='email'
            isError={
              errors.email?.type === 'required' ||
              errors.email?.type === 'pattern'
            }
            errorMessage={errors.email?.message || 'Please provide a valid email'}
          />
          <TextInput
            {...register('githubUser')}
            label='Github Username'
            placeholder='@jonatankristof0101'
          />

          {serverError && (
            <div className='rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-200 backdrop-blur-sm'>
              {serverError}
            </div>
          )}

          <Button submitting={submitting} />
        </div>
      </form>
    </div>
  )
}
