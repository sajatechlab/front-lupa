import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { GridPattern } from '@/components/GridPattern'
import Logo from '@/components/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { AiOutlineGoogle } from 'react-icons/ai'
import config from '@/config'
const Signup = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  // useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/auth/session', {
  //         credentials: 'include',
  //       })
  //       if (response.ok) {
  //         navigate('/dashboard')
  //       }
  //     } catch (error) {
  //       console.error('Session check error:', error)
  //     }
  //   }
  //   checkSession()
  // }, [navigate])

  const handleEmailSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Collect user data
    const userData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    }

    try {
      const response = await fetch(`${config.API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro')
      } else {
        toast({
          title: 'Registro exitoso',
          description: 'Ahora crea tu empresa para continuar.',
        })
      }

      // Redirect to company creation page
      navigate('/create-company')
    } catch (error) {
      console.error('Error:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          'No se pudo completar el registro. Por favor intenta de nuevo.',
      })
    }
  }

  // const handleGoogleSignup = async () => {
  //   try {
  //     window.location.href = 'http://localhost:3000/api/auth/google'
  //   } catch (error) {
  //     console.error('Error:', error)
  //     toast({
  //       variant: 'destructive',
  //       title: 'Error',
  //       description:
  //         'No se pudo iniciar sesión con Google. Por favor intenta de nuevo.',
  //     })
  //   }
  // }

  const pattern = {
    y: -6,
    squares: [
      [-1, 2] as [number, number],
      [1, 3] as [number, number],
      ...Array.from(
        { length: 10 },
        () =>
          [
            Math.floor(Math.random() * 20) - 10,
            Math.floor(Math.random() * 20) - 10,
          ] as [number, number]
      ),
    ] as [number, number][],
  }

  return (
    <Container>
      <div className="min-h-[60rem] flex justify-center items-start">
        <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
          <GridPattern
            width={120}
            height={120}
            x="50%"
            y={pattern.y}
            squares={pattern.squares}
            className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-5deg] fill-tertiary/[0.05] stroke-gray-100 dark:fill-primary dark:stroke-gray-100"
          />
        </div>
        <div className="px-10 py-20 rounded-xl bg-white shadow-lg w-[30rem] mt-10 md:mt-14 mx-4 relative z-10">
          <Logo textClassName="text-zinc-700" />
          <h1 className="my-8 text-xl text-zinc-700 text-center">
            Registro para LUPA
          </h1>

          <form onSubmit={handleEmailSignup}>
            <div className="space-y-6">
              <input
                type="text"
                className="w-full rounded-xl shadow-sm border border-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent p-2"
                placeholder="Nombre completo"
                name="fullName"
                required
              />
              <input
                type="email"
                className="w-full rounded-xl shadow-sm border border-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent p-2"
                placeholder="Correo electrónico"
                name="email"
                required
              />
              <input
                type="password"
                className="w-full rounded-xl shadow-sm border border-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent p-2"
                placeholder="Contraseña"
                name="password"
                required
              />
              <input
                type="password"
                className="w-full rounded-xl shadow-sm border border-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent p-2"
                placeholder="Confirmar contraseña"
                name="confirmPassword"
                required
              />
            </div>
            <Button type="submit" className="w-full rounded-2xl py-2 mt-6">
              Registrarse
            </Button>
          </form>

          {/* <div className="flex flex-row space-x-1 items-center mt-4">
            <div className="h-px w-1/2 bg-gray-200" />
            <span className="text-xs text-gray-500">o</span>
            <div className="h-px w-1/2 bg-gray-200" />
          </div> */}

          {/* <div className="mt-4">
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="flex flex-row space-x-2 w-full mx-auto bg-gray-50 justify-center items-center py-4 my-2 rounded-2xl hover:bg-gray-100"
            >
              <AiOutlineGoogle className="text-red-500 h-5 w-5" />
              <span>Registrarse con Google</span>
            </button>
          </div> */}
          <Link
            to="/login"
            className="text-gray-600 block mt-4 text-xs text-center"
          >
            ¿Ya tienes una cuenta? Inicia sesión aquí
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default Signup
