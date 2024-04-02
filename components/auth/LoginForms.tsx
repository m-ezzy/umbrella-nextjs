import { useFormState } from 'react-dom';
import { authenticateWithCredentials, authenticateWithGoogle } from '@/actions/auth'

function CredentialsLoginForm({ setError }: any) {
  // const [errorMessage, dispatch] = useFormState(authenticateWithCredentials, undefined);
  // if(errorMessage) setError(errorMessage);

  return (
    <form action={authenticateWithCredentials} className='form border border-black rounded-lg flex flex-col p-2 gap-2'>
      <div className="form-outline w-full">
        <input type="text" name="uniqueIdentifier" className="form-control rounded w-full" placeholder="UserID, Username, Email, Mobile" />
      </div>
      <div className="form-outline w-full text-black">
        <input type="password" name="password" className="form-control rounded w-full" placeholder="Password" />
      </div>
      <div className="form-outline">
        <button type="submit" className="form-control w-full text-black border border-black rounded-lg p-2 text-md font-semibold">Login with Credentials</button>
      </div>
    </form>
  );
}
function GoogleLoginForm({ setError }: any) { //GoogleLoginButton
  return (
    <form action={authenticateWithGoogle} className='form border border-black rounded-lg flex flex-col p-2 gap-2'>
      <button className="w-full bg-transparent border border-black rounded-lg p-0 hover:bg-violet-200">
        <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google Logo" className='w-12 h-12' />
        <span className="text-black text-md font-semibold">Login with Google</span>
      </button>
    </form>
  )
}
function GithubLoginForm({ setError }: any) {
  const handleClick = async () => {
    const res = await signIn('github') //('google', { callbackUrl: '/api/auth/callback/github' })
    if (res?.error) {
      setError(res.error)
    }
  }
  return (
    <button className="bg-transparent w-full border border-black rounded-lg space-x-2 hover:bg-violet-200" onClick={handleClick}>
      <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="Github Logo" className='w-10 h-10 rounded-md' />
      <span className="text-black text-md font-semibold">Login with Github</span>
    </button>
  )
}

export { CredentialsLoginForm, GoogleLoginForm, GithubLoginForm }
