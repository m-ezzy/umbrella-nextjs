import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function AuthLayout({ children }: { children: any }) {
  const session = await auth()

  // redirect to dashboard if user is already logged in
  if(session) redirect('/dashboard')

  // Oh my god! spent couple of hours on this error! tailwind will remove the classes from builds if they are not used
  // and i don't know why it's removing the classes p-14 and text-6xl
  // to overcome this you need to mention in tailwind config file to not "purge" the classes
  // figured it out! the path to layouts was not included in tailwing config file's content property so it was not checking the files in layouts folder

  let styles = {
    backgroundImage: 'url(/assets/images/umbrella-transparent.png)',
    backgroundSize: "150px 150px",
  }
  return(
    <main style={styles} className='bg-violet-200 h-full flex justify-center items-center'>
      <title>Login or Signup</title>
      <div className="bg-white rounded-md p-4 flex flex-col gap-2">
        <div className="p-12 text-7xl text-center">Umbrella</div> {/* style={{ fontSize: '5rem' }} */}
        {children}
      </div>
    </main>
  )
}
