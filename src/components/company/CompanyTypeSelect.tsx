import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { CompanyFormValues } from "./types";

interface CompanyTypeSelectProps {
  form: UseFormReturn<CompanyFormValues>;
}

export function CompanyTypeSelect({ form }: CompanyTypeSelectProps) {
  return (
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
  );
}