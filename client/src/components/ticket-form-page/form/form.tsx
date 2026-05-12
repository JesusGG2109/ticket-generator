import { UploadInput } from './upload-input'
import { TextInput } from './text-input'
import { Button } from './button'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useShowTicket } from '../../../hooks/use-show-ticket'
import { useUserStore } from '../../../store/user'
import { useState, type ChangeEvent } from 'react'

type Inputs = {
  fullName: string;
  email: string;
  githubUser: string;
}

export const Form = () => {

  const [imageUrl, setImageUrl] = useState<string>('')

  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm<Inputs>()

  const context = useShowTicket();
  const userStore = useUserStore();

  const sendForm: SubmitHandler<Inputs>  = (data) => {
    
    const {email, fullName, githubUser} = data;
    
    context.setShowTicket(true);

    userStore.setUser({
      email,
      fullName,
      githubUser,
      url: imageUrl
    })
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0]
    if(file){
      const url = URL.createObjectURL(file)
      console.log(file)
      console.log(url)
      setImageUrl(url)
    }

  }

  return (
    <form className='' onSubmit={handleSubmit(sendForm)}>
      <UploadInput
        url={imageUrl}
        onChange={handleChange}
      />
      <div className='flex flex-col gap-6'>
        <TextInput
          {...register("fullName", { required: "Full Name is required" })}
          label='Full Name'
          placeholder='Jonathan Kirstof'
          isError={errors.fullName?.type === 'required'}
          errorMessage={errors.fullName?.message}
        />
        <TextInput
          {...register("email", { 
            required: "Email is required", 
            pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
          })}
          label='Email Address'
          placeholder='jonatan@email.com'
          type='email'
          isError={errors.email?.type === 'required' || errors.email?.type === 'pattern'}
          errorMessage={errors.email?.message || 'Please provide a valid email'}
        />
        <TextInput
          {...register("githubUser")}
          label='Github Username'
          placeholder='@jonatankristof0101'
        />
        <Button />
      </div>
    </form>
  )
}
