import LoaderComponent from '@renderer/components/LoaderComponent'
import useAuthProvider from '@renderer/hooks/useAuthProvider'
import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Loader = () => {
  const navigate = useNavigate()

  const { token } = useAuthProvider()
  useEffect(() => {
    const interval = setTimeout(() => {
      if (token) {
        navigate('/main')
      } else {
        navigate('/login')
      }
    }, 500)
    return () => clearTimeout(interval)
  }, [])
  return (
    <LoaderComponent onboard />
  )
}

export default Loader
