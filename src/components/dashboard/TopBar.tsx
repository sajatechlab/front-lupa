import React, { useState, useEffect } from 'react'
import { Moon, Sun, Bell, Search, ChevronDown } from 'lucide-react'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import config from '../../config'
interface Company {
  id: string
  name: string
  nit: string
}

const TopBar = () => {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const queryClient = useQueryClient()

  const {
    data: companies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await axios.get(`${config.API_URL}/companies/by-user`, {
        withCredentials: true,
      })
      console.log('Companies response:', response.data)
      return response.data as Company[]
    },
  })

  useEffect(() => {
    console.log('Companies:', companies)
    console.log('Selected Company:', selectedCompany)
    if (companies.length > 0 && !selectedCompany) {
      setSelectedCompany(companies[0])
      queryClient.setQueryData(['selectedCompany'], companies[0])
    }
  }, [companies, selectedCompany, queryClient])

  useEffect(() => {
    setMounted(true)
    // Check system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as
        | 'light'
        | 'dark'
        | null
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      setTheme(savedTheme || systemTheme)
      document.documentElement.classList.toggle(
        'dark',
        savedTheme === 'dark' || systemTheme === 'dark'
      )
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  if (!mounted) return null

  const isDark = theme === 'dark'
  const bgColor = isDark ? 'bg-[#1A1F2C]' : 'bg-white'
  const borderColor = isDark ? 'border-[#9b87f5]/10' : 'border-gray-200'
  const inputBgColor = isDark ? 'bg-[#2A2F3C]' : 'bg-gray-100'
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const hoverBgColor = isDark ? 'hover:bg-[#353B4A]' : 'hover:bg-gray-100'

  return (
    <div
      className={`w-full h-16 ${bgColor} border-b ${borderColor} transition-colors duration-200`}
    >
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-2 px-4 py-2 ${inputBgColor} ${hoverBgColor} rounded-lg ${textColor} transition-colors`}
            >
              <span>
                {selectedCompany ? selectedCompany.name : 'Select Company'}
              </span>
              <ChevronDown className="h-4 w-4 text-[#9b87f5]" />
            </button>

            {isOpen && (
              <div
                className={`absolute top-full mt-1 w-64 ${inputBgColor} border ${borderColor} rounded-lg shadow-lg z-50`}
              >
                {companies.map((company) => (
                  <button
                    key={company.id}
                    className={`w-full px-4 py-2 text-left ${hoverBgColor} ${textColor} transition-colors`}
                    onClick={() => {
                      setSelectedCompany(company)
                      queryClient.setQueryData(['selectedCompany'], company)
                      setIsOpen(false)
                    }}
                  >
                    {company.name} - {company.nit}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9b87f5]" />
            <input
              type="text"
              placeholder="Search"
              className={`pl-10 pr-4 py-2 rounded-lg ${inputBgColor} ${hoverBgColor} w-64 ${textColor} placeholder-gray-400 border ${borderColor} focus:outline-none focus:border-[#9b87f5]/30 transition-colors`}
            />
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${hoverBgColor} transition-colors`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-[#9b87f5]" />
            ) : (
              <Moon className="h-5 w-5 text-[#9b87f5]" />
            )}
          </button>

          <button
            className={`p-2 rounded-lg ${hoverBgColor} transition-colors`}
          >
            <Bell className="h-5 w-5 text-[#9b87f5]" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopBar
