import axios from 'axios'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from 'react'
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import config from '../config'
type User = {
  id: string
  email: string
  role: string
  first_name: string
  last_name: string
  token?: string
}

interface AuthContextProps {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  loading: boolean
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => null,
  loading: true,
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchSession = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/auth/session`, {
        withCredentials: true,
      })
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching session:', error)
      setUser(null)
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSession()
  }, [])

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    )
  }

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
