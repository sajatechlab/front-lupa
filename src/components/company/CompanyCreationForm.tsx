import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { CompanyFormHeader } from "./CompanyFormHeader";
import { CompanyTypeSelect } from "./CompanyTypeSelect";
import { CompanyBasicInfo } from "./CompanyBasicInfo";
import { CompanyFormValues, companyFormSchema } from "./types";

export function CompanyCreationForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      nit: "",
      dv: "",
      name: "",
      type: "juridica",
      phone: "",
    },
  });

  async function onSubmit(values: CompanyFormValues) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Debes estar autenticado para crear una compañía",
        });
        return;
      }

      // First create the company
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .insert([
          {
            nit: values.nit,
            name: values.name,
            phone: values.phone,
            contributor_type_id: values.type === 'juridica' ? 1 : 2,
          },
        ])
        .select()
        .single();

      if (companyError) throw companyError;

      // Then create the user-company association
      const { error: associationError } = await supabase
        .from('user_companies')
        .insert([
          {
            user_id: user.id,
            company_id: company.id,
            role: 'owner',
          },
        ]);

      if (associationError) throw associationError;

      toast({
        title: "¡Éxito!",
        description: "Compañía creada exitosamente",
      });

      // Redirect to dashboard
      navigate('/');
    } catch (error) {
      console.error('Error creating company:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear la compañía. Por favor intenta de nuevo.",
      });
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <CompanyFormHeader />
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Crear una compañía</h3>
        <p className="text-gray-600 mb-6">Completa la información de tu empresa para continuar</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CompanyTypeSelect form={form} />
            <CompanyBasicInfo form={form} />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Crear compañía
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}