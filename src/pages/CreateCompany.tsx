import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { GridPattern } from '@/components/GridPattern'
import Logo from '@/components/Logo'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import axios from 'axios'
import config from '@/config'
const CreateCompany = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [personType, setPersonType] = useState('natural')

  const pattern = {
    y: -12,
    squares: [
      [0, 1],
      [1, 3],
    ],
  }

  const handleCompanyCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const companyData = {
      name: formData.get('businessName') as string,
      nit: formData.get('documentNumber') as string,
    }

    try {
      const response = await axios.post(
        `${config.API_URL}/companies`,
        companyData,
        {
          withCredentials: true,
        }
      )

      toast({
        title: '¡Éxito!',
        description: 'Empresa creada exitosamente',
      })

      navigate('/dashboard')
    } catch (error) {
      console.error('Error:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo crear la empresa. Por favor intenta de nuevo.',
      })
    }
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
            Crear una compañía
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Completa la información de tu empresa para continuar
          </p>

          <form onSubmit={handleCompanyCreation}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de persona
                </label>
                <select
                  className="w-full rounded-xl shadow-sm border border-gray-100 text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent p-2"
                  name="personType"
                  value={personType}
                  onChange={(e) => setPersonType(e.target.value)}
                  required
                >
                  <option value="natural">Natural</option>
                  <option value="juridica">Jurídica</option>
                </select>
              </div>

              {personType === 'natural' ? (
                <input
                  type="text"
                  className="w-full rounded-xl shadow-sm border border-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent p-2"
                  placeholder="Nombre completo"
                  name="fullName"
                  required
                />
              ) : (
                <input
                  type="text"
                  className="w-full rounded-xl shadow-sm border border-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent p-2"
                  placeholder="Razón social"
                  name="businessName"
                />
              )}

              <input
                type="text"
                className="w-full rounded-xl shadow-sm border border-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent p-2"
                placeholder={
                  personType === 'natural' ? 'Documento / Nit' : 'Nit'
                }
                name="documentNumber"
                required
              />
            </div>

            <Button type="submit" className="w-full rounded-2xl py-2 mt-6">
              Crear compañía
            </Button>
          </form>
        </div>
      </div>
    </Container>
  )
}

export default CreateCompany
