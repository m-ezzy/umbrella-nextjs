import AuthLayout from '@/components/layouts/AuthLayout'
import CredentialsLoginForm from '@/components/auth/CredentialsLoginForm'
import GoogleLoginForm from '@/components/auth/GoogleLoginForm'

export default async function Page() {
  return(
    // <AuthLayout>
    <>
      <CredentialsLoginForm />
      <GoogleLoginForm />
    </>
    // </AuthLayout>
  )
}
