import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Company {
  id: string;
  name: string;
}

interface UserCompany {
  company_id: string;
  companies: Company;
}

const Dashboard = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [companies, setCompanies] = useState<Company[]>([]);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data: userCompanies, error } = await supabase
        .from('user_companies')
        .select(`
          company_id,
          companies (
            id,
            name
          )
        `)
        .eq('user_id', session?.user?.id);

      if (error) {
        console.error('Error fetching companies:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch your companies",
        });
        return;
      }

      const formattedCompanies = userCompanies
        ? userCompanies.map((uc: UserCompany) => uc.companies)
        : [];

      setCompanies(formattedCompanies);
    };

    if (session?.user) {
      fetchCompanies();
    }
  }, [session, supabase, toast]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">
              Welcome, {session?.user?.email}
            </p>
          </div>
          <Button
            onClick={() => navigate('/companyregistration')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create Company
          </Button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Companies</h2>
          {companies.length > 0 ? (
            <div className="grid gap-4">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer"
                >
                  <h3 className="font-medium">{company.name}</h3>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              You haven't created any companies yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;