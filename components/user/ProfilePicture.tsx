import { useFormState } from 'react-dom'
import Image from 'next/image'
import { updateUserProfilePicture } from '@/actions/user'

export default function ProfilePicture({ user_id, profile_picture_url }: any) {
  // const [formState, dispatch] = useFormState(updateUserProfilePicture, null)
  
  return (
    <div className='p-2'>
      <Image src={`/data/user/profile_pictures/${profile_picture_url}`} alt="profile picture" width={200} height={200} className="w-60 h-60 mb-2 rounded-md" />

      <form action={updateUserProfilePicture} className='flex gap-2 items-center'> {/* /api/user/upload/pp */}
        <input type="hidden" name="old_profile_picture" value={profile_picture_url} />

        <label htmlFor="profile_picture">Profile Picture</label>
        <input type="file" name="profile_picture" className="file:bg-violet-500 file:text-white file:border-0 file:rounded-md file:p-2" />
        <button type="submit">upload</button>
      </form>
    </div>
  )
}
