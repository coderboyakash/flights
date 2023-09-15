'use client'
import React, { useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

const IsLoggedIn = ({ children }) => {
    const { data: session, status } = useSession()
    const router = useRouter()
    useEffect(() => {
        if(status === "unauthenticated"){
            setTimeout(() => {
                router.push('/login')
            }, 1000);
        }
    }, [status])
    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <div>Please wait redirecting you to login page...</div>
    }
    return (
        <div>{children}</div>
    )
}

export default IsLoggedIn