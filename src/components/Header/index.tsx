import { BiLogIn, BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router'

import { auth } from '../../services/firebaseConnection'
import { signOut } from "firebase/auth"
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

const Header = () => {
  const [signed, setSigned] = useState(false)

  const handleLogout = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setSigned(false)
      } else {
        setSigned(true)
      }
    })

    return (() => unsub())
  }, [])

  return (
    <header className="w-full max-w-2xl mt-4 px-1">
      <nav className="w-full bg-white h-12 flex items-center justify-between rounded-md px-3">
        <div className="flex gap-4 font-medium">
          <Link to="/">Home</Link>
          {signed && (
            <>
              <Link to="/admin">Links</Link>
              <Link to="/admin/network">Networks</Link>
            </>
          )}
        </div>
        {signed ?
          <button onClick={handleLogout} className='cursor-pointer'>
            <BiLogOut size={28} color="#db2629" />
          </button> :
          <Link to="/login" className='cursor-pointer'>
            <BiLogIn size={28} color="#00ff00" />
          </Link>
        }
      </nav>
    </header>
  )
}

export default Header