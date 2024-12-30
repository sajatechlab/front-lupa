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
  nit: z.string().min(1, "NIT is required"),
  name: z.string().min(1, "Company name is required"),
  type: z.enum(["juridica", "natural"], {
    required_error: "Please select a company type",
  }),
});

export function CompanyCreationForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nit: "",
      name: "",
      type: "juridica",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You must be logged in to create a company",
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
            contributor_type_id: values.type === 'juridica' ? 1 : 2, // Assuming these IDs exist
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
        title: "Success",
        description: "Company created successfully",
      });

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating company:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create company. Please try again.",
      });
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create Your Company</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="nit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIT</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company NIT" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company type" />
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
          <Button type="submit" className="w-full">Create Company</Button>
        </form>
      </Form>
    </div>
  );
}