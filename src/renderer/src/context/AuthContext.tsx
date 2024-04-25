import { createContext, useEffect, useState } from 'react'

export interface AuthContextProps {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  user: any
  setUser: React.Dispatch<React.SetStateAction<any>>
  token: string | null  
  setToken: React.Dispatch<React.SetStateAction<string | null>>
}
export const AuthContext = createContext<AuthContextProps | null>(null)

interface AuthProviderProps {
  children: React.ReactNode
}

// export const BASE_URL = 'http://nis2024.innepal.biz'
export const BASE_URL = 'https://register.investinnepal.gov.np/'
export const Error_MESSAGE = 'Invalid token, Access Denied'
 // Test Server
// export const  authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijoie30iLCJhdWQiOiJpY25yMjAyMSIsImlzcyI6ImljbnIyMDIxIiwidXNlcl9pZCI6IjM1OWQ4MjUxLWYwN2UtNGFlMy1iNzY4LTY0MDlmMDhjYzIzOSIsInVzZXJfY2hhdF9pZCI6ImlmYXdwY2EzNTlkODI1MS1mMDdlLTRhZTMtYjc2OC02NDA5ZjA4Y2MyMzkiLCJpYXQiOjE3MTM1MzkyMzksIm5iZiI6MTcxMzUzOTIzOSwiZXhwIjoxNzE0NDAzMjM5fQ.uIt---5tQ8m0ia5A5saMwEJOQfXZAZfipO-97L1s--M"

// Live Server
export const  authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijoie30iLCJhdWQiOiJpY25yMjAyMSIsImlzcyI6ImljbnIyMDIxIiwidXNlcl9pZCI6IjM1OWQ4MjUxLWYwN2UtNGFlMy1iNzY4LTY0MDlmMDhjYzIzOSIsInVzZXJfY2hhdF9pZCI6ImlmYXdwY2EzNTlkODI1MS1mMDdlLTRhZTMtYjc2OC02NDA5ZjA4Y2MyMzkiLCJpYXQiOjE3MTQwMDgwNTEsIm5iZiI6MTcxNDAwODA1MSwiZXhwIjoxNzE2NjAwMDUxfQ.2S6AO1TWWDCbC7sDYr6pf17idwzDRrudtUI4lo6SJjU"

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  //   const jwtToken = store.get('jwtToken')
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(token ? true : false)
  const [user, setUser] = useState<any>(null)
  // const ipcHandleToken = () => window.electron.ipcRenderer.send('store', 'jwt')
  // const ipcHandleUser = () => window.electron.ipcRenderer.send('user', 'jwt')

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    }
  }, [token])

  // useEffect(() => {
  //   const getJwtToken =  () => {
  //     ipcHandleToken()
  //     ipcHandleUser()
  //     const userData =  window.electron.ipcRenderer.on('user-data-reply', ( arg) => {
  //       console.log(arg, "user data")
  //       if (arg && !user) {
  //         // setUser(arg)
  //       }
  //     })
  //     userData();
      
  //     const tokenData =  window.electron.ipcRenderer.on('token-data-reply', ( arg) => {
  //       console.log(arg, "token data")
  //       if (arg && !token) {
  //         // setToken(arg)
  //       }
  //     })
  //     tokenData();
  //   }
    
  //   getJwtToken()
    
  // }, [isAuthenticated])

  console.log(isAuthenticated)
  console.log(user)
  console.log(token)
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
