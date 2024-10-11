'use client'

import { useState } from "react"

export default function NavbarContentDashboard() {
  const [search, setSearch] = useState('')
  const [micState, setMicState] = useState('inactive')

  const handleChangeSearch = (e: any) => {
    console.log('search term changed')
  }
  const handleClickMic = (e: any) => {
    e.preventDefault()
    setMicState(e => (e === 'inactive' ? 'listening' : 'inactive'))
  }
  return (
    <>
      <div className="flex gap-2 items-center">
        <form>
          <input type="search" placeholder="search" onChange={handleChangeSearch} />
        </form>
        <button onClick={handleClickMic}>
          {/* <Image src="/assets/images/ui/mic.png" alt="voice recognition" width={30} height={30} className="border" /> */}
          <span className="material-symbols-outlined">mic</span>
        </button>
      </div>
    </>
  )
}
