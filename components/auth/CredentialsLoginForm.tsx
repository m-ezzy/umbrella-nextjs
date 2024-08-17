"use client"
import { useFormState } from 'react-dom'
import { redirect } from 'next/navigation';
import { authenticateWithCredentials } from '@/actions/auth'
import TextInput from '@/components/form_controls/TextInput'

export default function CredentialsLoginForm({ setError }: any) {
  const [state, formAction] = useFormState(authenticateWithCredentials, null)

  if(state?.error) setError(state.error)
  return (
    <form action={formAction} className='form flex flex-col p-2 gap-2'>
      <TextInput label='Username / Email / Mobile' field_name='uniqueIdentifier' extra_classes="w-full" />
      <TextInput label="Password" field_name="password" extra_classes="w-full" />
      <div className="form-outline">
        <button type="submit" className="form-control w-full rounded-lg p-2 text-lg hover:bg-violet-600">Login with Credentials</button>
      </div>
    </form>
  );
}
