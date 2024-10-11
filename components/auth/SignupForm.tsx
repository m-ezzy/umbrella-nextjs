'use client'

import { useFormState } from 'react-dom'
import { redirect } from 'next/navigation'
import { signupWithCredentials } from '@/actions/auth'
import FormInput from '@/components/ui/form_controls/FormInput'

export default function SignupForm() {
  const [state, dispatch] = useFormState(signupWithCredentials, null)

  // if(state?.error) setError(state.error)
  if(state?.success) {
    redirect('/dashboard')
  }
  return (
    <form action={dispatch} className='form flex flex-col p-2 gap-2'>
      <FormInput type='text' label='Username' name='username' />
      <FormInput type='text' label="Password" name="password" />
      <button type="submit" className="form-control w-full rounded-lg p-2 text-lg hover:bg-violet-600">Signup</button>
      {state?.error && <div className="text-red-400">{state.error}</div>}
    </form>
  )
}
