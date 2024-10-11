"use client"

import { useFormState } from 'react-dom'
import Image from 'next/image'
import { updateUserProfilePicture } from '@/actions/user'

export default function ProfilePicture({ user_id, profile_picture_url }: any) {
  // const [state, dispatch] = useFormState(updateUserProfilePicture, null);
  
  return (
    <div className='p-2'>
      <Image src={profile_picture_url ? `/data/user/profile_pictures/${profile_picture_url}` : "/assets/images/person.jpeg"} alt="profile picture" width={160} height={160} className="w-50 h-50 mb-2 rounded-md" />

      <form action={updateUserProfilePicture} className='flex gap-2 items-center'> {/* /api/user/upload/pp */}
        <input type="hidden" name="old_profile_picture" value={profile_picture_url} />

        <label htmlFor="profile_picture">Profile Picture</label>
        <input type="file" name="profile_picture" />
        <button type="submit">upload</button>
      </form>
    </div>
  )
}
