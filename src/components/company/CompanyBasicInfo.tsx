import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CompanyFormValues } from "./types";

interface CompanyBasicInfoProps {
  form: UseFormReturn<CompanyFormValues>;
}

export const CompanyBasicInfo = ({ form }: CompanyBasicInfoProps) => {
  return (
    <>
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
    </>
  );
};