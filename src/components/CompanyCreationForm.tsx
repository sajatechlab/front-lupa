import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  nit: z.string().min(1, "NIT es requerido"),
  dv: z.string().min(1, "DV es requerido"),
  name: z.string().min(1, "Razón social es requerida"),
  type: z.enum(["juridica", "natural"], {
    required_error: "Por favor seleccione un tipo de persona",
  }),
  phone: z.string().min(1, "Número de teléfono es requerido"),
});

export function CompanyCreationForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nit: "",
      dv: "",
      name: "",
      type: "juridica",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
      navigate('/dashboard');
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
      <div className="flex items-center gap-2 mb-6">
        <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-8 w-8" />
        <h2 className="text-2xl font-bold">Tu convertidor de facturas</h2>
      </div>
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Crear una compañía</h3>
        <p className="text-gray-600 mb-6">Completa la información de tu empresa para continuar</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de persona</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de persona" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="juridica">Jurídica</SelectItem>
                      <SelectItem value="natural">Natural</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razón social</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa la razón social" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIT</FormLabel>
                    <FormControl>
                      <Input placeholder="Sin puntos ni dígito de verificación" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DV</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} maxLength={1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa el número de teléfono" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Crear compañía
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}