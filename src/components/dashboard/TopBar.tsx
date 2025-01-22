import React, { useState, useEffect } from 'react';
import { Moon, Sun, Bell, Search, ChevronDown } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';

interface Company {
  id: string;
  name: string;
}

const TopBar = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const { data: companies = [] } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data as Company[];
    },
  });

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  useEffect(() => {
    if (companies.length > 0 && !selectedCompany) {
      setSelectedCompany(companies[0]);
    }
  }, [companies]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!mounted) return null;

  return (
    <div className="w-full h-16 bg-[#1A1F2C] border-b border-[#9b87f5]/10">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-[#2A2F3C] hover:bg-[#353B4A] rounded-lg text-white transition-colors"
            >
              <span>{selectedCompany?.name || 'Select Company'}</span>
              <ChevronDown className="h-4 w-4 text-[#9b87f5]" />
            </button>
            
            {isOpen && (
              <div className="absolute top-full mt-1 w-48 bg-[#2A2F3C] border border-[#9b87f5]/10 rounded-lg shadow-lg z-50">
                {companies.map((company) => (
                  <button
                    key={company.id}
                    className="w-full px-4 py-2 text-left hover:bg-[#353B4A] text-white transition-colors"
                    onClick={() => {
                      setSelectedCompany(company);
                      setIsOpen(false);
                    }}
                  >
                    {company.name}
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
              className="pl-10 pr-4 py-2 rounded-lg bg-[#2A2F3C] hover:bg-[#353B4A] w-64 text-white placeholder-gray-400 border border-[#9b87f5]/10 focus:outline-none focus:border-[#9b87f5]/30 transition-colors"
            />
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-[#2A2F3C] transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-[#9b87f5]" />
            ) : (
              <Moon className="h-5 w-5 text-[#9b87f5]" />
            )}
          </button>
          
          <button className="p-2 rounded-lg hover:bg-[#2A2F3C] transition-colors">
            <Bell className="h-5 w-5 text-[#9b87f5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;