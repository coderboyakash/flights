import React from 'react'
import Providers from '../providers/StoreProvider'
import { NextAuthProvider } from '../providers/NextAuthProvider'
import IsLoggedIn from '../components/IsLoggedIn'

const HomeLayout = ({ children }) => {
    return (
        <Providers>
            <NextAuthProvider>
                <IsLoggedIn>
                    {children}
                </IsLoggedIn>
            </NextAuthProvider>
        </Providers>
    )
}

export default HomeLayout