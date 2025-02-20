import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import Index from './pages/Index'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Dashboard from './pages/Dashboard'
import Documents from './pages/Documents'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import { AuthProvider } from './components/ProtectedRoute'
import { supabase } from './integrations/supabase/client'
import CreateCompany from './pages/CreateCompany'

const queryClient = new QueryClient()

const App = () => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/create-company"
                element={
                  <AuthProvider>
                    <CreateCompany />
                  </AuthProvider>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route
                path="/dashboard"
                element={
                  <AuthProvider>
                    <Dashboard />
                  </AuthProvider>
                }
              />
              <Route
                path="/documents"
                element={
                  <AuthProvider>
                    <Documents />
                  </AuthProvider>
                }
              />
              <Route
                path="/dashboard/profile"
                element={
                  <AuthProvider>
                    <Profile />
                  </AuthProvider>
                }
              />
              <Route
                path="/dashboard/settings"
                element={
                  <AuthProvider>
                    <Settings />
                  </AuthProvider>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  )
}

export default App
