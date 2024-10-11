'use client'

import { useFormState } from 'react-dom'
import { redirect, useRouter } from 'next/navigation'
import { authenticateWithCredentials } from '@/actions/auth'
import FormInput from '@/components/ui/form_controls/FormInput'

export default function CredentialsLoginForm() {
  const [state, dispatch] = useFormState(authenticateWithCredentials, { success: false, error: null })
  const { refresh } = useRouter()

  if(state?.success) {
    // redirect('/dashboard'); //can be used only if this is a Server Component
    // refresh(); //can be used only if this is a Client Component
    // setUser((prev: any) => state.data); //can be used only if this is a Client Component
  }
  return (
    <form action={dispatch} className='form flex flex-col gap-2'>
      <FormInput type='text' label='Username / Email / Mobile' name='uniqueIdentifier' />
      <FormInput type='password' label="Password" name="password" />
      <button type="submit" className="form-control text-lg">Login with Credentials</button>
      {state?.error && <div className="text-red-400">{state.error}</div>}
    </form>
  )
}
