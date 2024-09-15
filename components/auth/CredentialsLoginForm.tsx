"use client"
import { useFormState } from 'react-dom'
import { redirect } from 'next/navigation';
// import { authenticateWithCredentials } from '@/actions/auth'
// import TextInput from '@/components/form_controls/TextInput'
import FormInput from '@/components/form_controls/FormInput';

export default function CredentialsLoginForm({ serverAction, setError }: any) {
  const [state, formAction]: any = useFormState(serverAction, null);

  // if(state?.error) setError(state.error)
  return (
    <form action={formAction} className='form flex flex-col p-2 gap-2'>
      <FormInput label='Username / Email / Mobile' name='uniqueIdentifier' />
      <FormInput label="Password" name="password" />
      {/* <div className="form-outline"> */}
        <button type="submit" className="form-control w-full rounded-lg p-2 text-lg hover:bg-violet-600">Login with Credentials</button>
      {/* </div> */}
    </form>
  );
}
