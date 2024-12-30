export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounting_systems: {
        Row: {
          id: number
          is_custom: boolean | null
          name: string
        }
        Insert: {
          id?: number
          is_custom?: boolean | null
          name: string
        }
        Update: {
          id?: number
          is_custom?: boolean | null
          name?: string
        }
        Relationships: []
      }
      buyers: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          fiscal_responsibility: string | null
          id: string
          name: string
          nit: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          fiscal_responsibility?: string | null
          id?: string
          name: string
          nit: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          fiscal_responsibility?: string | null
          id?: string
          name?: string
          nit?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          department_id: number | null
          id: number
          name: string
        }
        Insert: {
          department_id?: number | null
          id?: number
          name: string
        }
        Update: {
          department_id?: number | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          accounting_system_id: number | null
          address: string | null
          city_id: number | null
          contributor_type_id: number | null
          created_at: string
          email: string | null
          fiscal_responsibility_id: number | null
          id: string
          name: string
          nit: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          accounting_system_id?: number | null
          address?: string | null
          city_id?: number | null
          contributor_type_id?: number | null
          created_at?: string
          email?: string | null
          fiscal_responsibility_id?: number | null
          id?: string
          name: string
          nit: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          accounting_system_id?: number | null
          address?: string | null
          city_id?: number | null
          contributor_type_id?: number | null
          created_at?: string
          email?: string | null
          fiscal_responsibility_id?: number | null
          id?: string
          name?: string
          nit?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "companies_accounting_system_id_fkey"
            columns: ["accounting_system_id"]
            isOneToOne: false
            referencedRelation: "accounting_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_contributor_type_id_fkey"
            columns: ["contributor_type_id"]
            isOneToOne: false
            referencedRelation: "contributor_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_fiscal_responsibility_id_fkey"
            columns: ["fiscal_responsibility_id"]
            isOneToOne: false
            referencedRelation: "fiscal_responsibilities"
            referencedColumns: ["id"]
          },
        ]
      }
      contributor_types: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      fiscal_responsibilities: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      invoice_files: {
        Row: {
          created_at: string
          id: string
          invoice_id: string
          pdf_url: string | null
          xml_url: string | null
          zip_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          invoice_id: string
          pdf_url?: string | null
          xml_url?: string | null
          zip_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          invoice_id?: string
          pdf_url?: string | null
          xml_url?: string | null
          zip_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_files_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          created_at: string
          description: string | null
          discount: number | null
          id: string
          invoice_id: string
          item_name: string
          quantity: number
          tax_percent: number
          tax_value: number
          total_item_value: number
          unit_value: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount?: number | null
          id?: string
          invoice_id: string
          item_name: string
          quantity: number
          tax_percent: number
          tax_value: number
          total_item_value: number
          unit_value: number
        }
        Update: {
          created_at?: string
          description?: string | null
          discount?: number | null
          id?: string
          invoice_id?: string
          item_name?: string
          quantity?: number
          tax_percent?: number
          tax_value?: number
          total_item_value?: number
          unit_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          company_id: string
          created_at: string
          cufe: string
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          payment_method: string
          subtotal: number
          total_amount: number
          total_tax: number
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          cufe: string
          due_date: string
          id?: string
          invoice_number: string
          issue_date: string
          payment_method: string
          subtotal: number
          total_amount: number
          total_tax: number
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          cufe?: string
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          payment_method?: string
          subtotal?: number
          total_amount?: number
          total_tax?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          is_active: boolean | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          is_active?: boolean | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          end_date: string
          id: string
          plan_type: string
          start_date: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          plan_type: string
          start_date?: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          plan_type?: string
          start_date?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_companies: {
        Row: {
          company_id: string
          created_at: string
          role: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          role?: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          fiscal_responsibility: string | null
          id: string
          name: string
          nit: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          fiscal_responsibility?: string | null
          id?: string
          name: string
          nit: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          fiscal_responsibility?: string | null
          id?: string
          name?: string
          nit?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_subscription_status: {
        Args: {
          check_user_id: string
        }
        Returns: {
          plan_type: string
          status: string
          days_until_expiration: number
        }[]
      }
      update_expired_subscriptions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
