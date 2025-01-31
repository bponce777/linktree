"use client"

import React, { useEffect, useState } from 'react'
import { TreePalm } from 'lucide-react'
import { LinkProfile } from './components'
import { User, Link } from '@prisma/client'
import { useUser } from '@clerk/nextjs'
import { LoaderProfile } from '@/components/shared/LoaderProfile'

export default function HomePage() {
  const { user } = useUser();
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [reload, setreload] = useState(false);
  const [infoUser, setInfoUser] = useState<User & { links: Link[] } | null>(null);

  useEffect(() => {
    const checkFirstLogin = async () => {
      const response = await fetch("/api/info-user")
      const data = await response.json()
      setInfoUser(data);
      setIsFirstVisit(data.firstLogin)
    }
    checkFirstLogin()
    if (reload) {
      checkFirstLogin()
      setreload(false)
    }
  }, [user?.id, reload, user])

  if (!user || !infoUser) {
    return <LoaderProfile />
  }

  if (isFirstVisit) {
    return (
      <div>
        <p>Es la primera visita</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[60%_auto] gap-4 px-4">
        <div>
          <LinkProfile />
          {/* Profile Info /> */}
          <div>
            <p>Profile info</p>
          </div>

          <div className="mt-20 flex flex-col items-center">
            <div className="py-10 text-center justify-center flex flex-col items-center text-gray-400">
              <TreePalm className="h-20 w-20" strokeWidth={1} />
              <p>Show the world who you are</p>
              <p>Add a link to get  started</p>
            </div>
          </div>
        </div>
        {/*Porfile priviou */}
        <p>Profile previow</p>
        <div>

        </div>
      </div>
    </div>
  )
}
