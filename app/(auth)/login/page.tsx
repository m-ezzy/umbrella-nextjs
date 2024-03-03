"use client";
import { useState } from 'react'
import { redirect } from 'next/navigation'
import { SessionProvider, useSession } from 'next-auth/react'
import { CredentialsLoginForm, GoogleLoginForm, GithubLoginForm } from '@/components/LoginForms'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  
  const { data, status } = useSession();
  console.log(data, status)
  if (status === 'loading') {
    setLoading(true)
  } else if(status === 'authenticated' || data) {
    redirect('/')
  }

  // let styles = {
  //   backgroundImage: "url(/asests/images/black-umbrella-png-9.png)",
  // }
  let imagePath = "/assets/images/black-umbrella-png-9.png"

  return(
    <main style={{ backgroundImage: `url(${imagePath})`, backgroundSize: "200px 200px" }} className='bg-zinc-800 h-screen flex items-center'>
      <title>Login</title>

      {/* <Image src={imagePath} alt="Umbrella Logo" fill={true} className="w-32 h-32 mx-auto mt-8" /> */}
      <div className="bg-zinc-800 border rounded-lg mx-auto flex flex-col p-4 gap-4">
        <div className="text-8xl">Umbrella</div>
        <CredentialsLoginForm setError={setError} />
        <GoogleLoginForm setError={setError} />
        <GithubLoginForm setError={setError} />
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </main >
  );
}
