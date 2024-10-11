'use client'

import { useFormState } from 'react-dom'
import Image from 'next/image'
import { authenticateWithGoogle } from '@/actions/auth'

export default function GoogleLoginForm({ setError }: any) { //GoogleLoginButton
  const [state, dispatch]: any = useFormState(authenticateWithGoogle, null)
  return (
    <div>
      <button formAction={dispatch} className='gap-2'>
        <Image src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" width={30} height={30} alt="Google Logo" />
        {/* <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" width={30} height={30} alt="Google Logo" /> */}
        <span className="text-lg">Login with Google</span>
      </button>
      {state?.error && <div className="text-red-400">{state?.error}</div>}
    </div>
  )
}
