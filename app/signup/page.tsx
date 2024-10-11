import { signupWithCredentials } from '@/actions/auth'
import AuthLayout from '@/components/layouts/AuthLayout'
import SignupForm from '@/components/auth/SignupForm'

export default async function Page() {
  return(
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  )
}
