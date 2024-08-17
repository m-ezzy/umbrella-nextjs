import { useFormState } from 'react-dom';
import { authenticateWithGoogle } from '@/actions/auth'

export default function GoogleLoginForm({ setError }: any) { //GoogleLoginButton
  return (
    <form action={authenticateWithGoogle} className='form flex flex-col p-2 gap-2'>
      <button className="w-full bg-transparent border border-black rounded-lg p-0 hover:bg-gray-100">
        <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google Logo" className='w-12 h-12' />
        <span className="text-black text-lg">Login with Google</span>
      </button>
    </form>
  )
}
