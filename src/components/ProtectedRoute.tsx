import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasCompany, setHasCompany] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);

      if (session) {
        // Check if user has any companies
        const { data: companies } = await supabase
          .from('user_companies')
          .select('company_id')
          .eq('user_id', session.user.id)
          .limit(1);

        setHasCompany(!!companies && companies.length > 0);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null || hasCompany === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated but has no company and isn't on the company registration page
  if (isAuthenticated && !hasCompany && location.pathname !== '/companyregistration') {
    return <Navigate to="/companyregistration" replace />;
  }

  return <>{children}</>;
};