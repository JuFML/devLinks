import { ReactNode, useEffect, useState } from 'react'
import { Navigate } from 'react-router'

import { auth } from "../services/firebaseConnection"
import { onAuthStateChanged } from 'firebase/auth'

interface PrivateProps {
  children: ReactNode
}

const Private = ({ children }: PrivateProps) => {
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false)
        setSigned(false)
      } else {
        setLoading(false)
        setSigned(true)
      }
    })

    return (() => unsub())
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!signed) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

export default Private