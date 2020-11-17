import { Context } from '@apollo/client'
import React, { createContext, useContext, useState } from 'react'

type Props = {
  children: JSX.Element
}

type Auth = {
  token: string | null
}

const initialState: Auth = {
  token: null,
}

const UserContext = createContext<Auth>(initialState)

export const useUser = (): Context => useContext(UserContext)

export const UserProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={{ token : "3" }}>
      {children}
    </UserContext.Provider>
  )
}
