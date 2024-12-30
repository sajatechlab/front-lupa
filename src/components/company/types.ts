import { z } from "zod";

export const companyFormSchema = z.object({
  nit: z.string().min(1, "NIT es requerido"),
  dv: z.string().min(1, "DV es requerido"),
  name: z.string().min(1, "Razón social es requerida"),
  type: z.enum(["juridica", "natural"], {
    required_error: "Por favor seleccione un tipo de persona",
  }),
  phone: z.string().min(1, "Número de teléfono es requerido"),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;