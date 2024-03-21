"use client";
import { useState } from 'react'
import { redirect } from 'next/navigation'
import { SessionProvider, useSession } from 'next-auth/react'
import { CredentialsLoginForm, GoogleLoginForm, GithubLoginForm } from '@/components/LoginForms'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // let styles = {
  //   backgroundImage: "url(/asests/images/black-umbrella-png-9.png)",
  // }
  let imagePath = "/assets/images/black-umbrella-png-9.png"

  return(
    <main style={{ backgroundImage: `url(${imagePath})`, backgroundSize: "160px 160px" }} className='bg-violet-100 min-h-full flex items-center'>
      <title>Login</title>

      {/* <Image src={imagePath} alt="Umbrella Logo" fill={true} className="w-32 h-32 mx-auto mt-8" /> */}
      <div className="bg-violet-100 text-black border border-black rounded-lg mx-auto flex flex-col p-4 gap-4">
        <div className="text-8xl">Umbrella</div>
        <CredentialsLoginForm setError={setError} />
        <GoogleLoginForm setError={setError} />
        {/* <GithubLoginForm setError={setError} /> */}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </main >
  );
}
