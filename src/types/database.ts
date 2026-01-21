/**
 * ============================================================
 * NeXifyAI Starter-Kit: Database Types
 * ============================================================
 * 
 * Auto-generierte Typen für Supabase
 * 
 * Generieren mit:
 *   supabase gen types typescript --local > src/types/database.ts
 * 
 * Oder für Remote-DB:
 *   supabase gen types typescript --project-id=YOUR_PROJECT_ID > src/types/database.ts
 * 
 * ============================================================
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // ========================================
      // Users & Auth
      // ========================================
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          locale: string
          timezone: string
          is_active: boolean
          current_company_id: string | null
          email_verified_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          locale?: string
          timezone?: string
          is_active?: boolean
          current_company_id?: string | null
          email_verified_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          locale?: string
          timezone?: string
          is_active?: boolean
          current_company_id?: string | null
          email_verified_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          user_id: string
          theme: string
          notifications_email: boolean
          notifications_push: boolean
          notifications_marketing: boolean
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          theme?: string
          notifications_email?: boolean
          notifications_push?: boolean
          notifications_marketing?: boolean
          settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          theme?: string
          notifications_email?: boolean
          notifications_push?: boolean
          notifications_marketing?: boolean
          settings?: Json
          created_at?: string
          updated_at?: string
        }
      }

      // ========================================
      // Multi-Tenant
      // ========================================
      companies: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          email: string | null
          phone: string | null
          website: string | null
          address: Json
          settings: Json
          plan: 'starter' | 'business' | 'enterprise'
          plan_expires_at: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          email?: string | null
          phone?: string | null
          website?: string | null
          address?: Json
          settings?: Json
          plan?: 'starter' | 'business' | 'enterprise'
          plan_expires_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          email?: string | null
          phone?: string | null
          website?: string | null
          address?: Json
          settings?: Json
          plan?: 'starter' | 'business' | 'enterprise'
          plan_expires_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      company_members: {
        Row: {
          id: string
          company_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member' | 'viewer'
          is_active: boolean
          invited_at: string | null
          joined_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'member' | 'viewer'
          is_active?: boolean
          invited_at?: string | null
          joined_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'member' | 'viewer'
          is_active?: boolean
          invited_at?: string | null
          joined_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      // ========================================
      // E-Commerce
      // ========================================
      categories: {
        Row: {
          id: string
          company_id: string | null
          parent_id: string | null
          name: string
          slug: string
          description: string | null
          image_url: string | null
          position: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id?: string | null
          parent_id?: string | null
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          position?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string | null
          parent_id?: string | null
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          position?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          company_id: string | null
          category_id: string | null
          name: string
          slug: string
          description: string | null
          short_description: string | null
          images: string[]
          price: number
          compare_at_price: number | null
          currency: string
          sku: string | null
          barcode: string | null
          stock_quantity: number
          track_inventory: boolean
          allow_backorder: boolean
          weight: number | null
          dimensions: Json
          meta_title: string | null
          meta_description: string | null
          status: 'draft' | 'active' | 'archived'
          is_featured: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id?: string | null
          category_id?: string | null
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          images?: string[]
          price?: number
          compare_at_price?: number | null
          currency?: string
          sku?: string | null
          barcode?: string | null
          stock_quantity?: number
          track_inventory?: boolean
          allow_backorder?: boolean
          weight?: number | null
          dimensions?: Json
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'active' | 'archived'
          is_featured?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string | null
          category_id?: string | null
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          images?: string[]
          price?: number
          compare_at_price?: number | null
          currency?: string
          sku?: string | null
          barcode?: string | null
          stock_quantity?: number
          track_inventory?: boolean
          allow_backorder?: boolean
          weight?: number | null
          dimensions?: Json
          meta_title?: string | null
          meta_description?: string | null
          status?: 'draft' | 'active' | 'archived'
          is_featured?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          options: Json
          price: number | null
          compare_at_price: number | null
          sku: string | null
          barcode: string | null
          stock_quantity: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          options?: Json
          price?: number | null
          compare_at_price?: number | null
          sku?: string | null
          barcode?: string | null
          stock_quantity?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          options?: Json
          price?: number | null
          compare_at_price?: number | null
          sku?: string | null
          barcode?: string | null
          stock_quantity?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          company_id: string | null
          user_id: string | null
          order_number: string
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
          subtotal: number
          tax_amount: number
          shipping_amount: number
          discount_amount: number
          total: number
          currency: string
          billing_address: Json
          shipping_address: Json
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          customer_notes: string | null
          internal_notes: string | null
          tracking_number: string | null
          tracking_url: string | null
          confirmed_at: string | null
          shipped_at: string | null
          delivered_at: string | null
          cancelled_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id?: string | null
          user_id?: string | null
          order_number?: string
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
          subtotal?: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          total?: number
          currency?: string
          billing_address?: Json
          shipping_address?: Json
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          customer_notes?: string | null
          internal_notes?: string | null
          tracking_number?: string | null
          tracking_url?: string | null
          confirmed_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          cancelled_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string | null
          user_id?: string | null
          order_number?: string
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
          subtotal?: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          total?: number
          currency?: string
          billing_address?: Json
          shipping_address?: Json
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          customer_notes?: string | null
          internal_notes?: string | null
          tracking_number?: string | null
          tracking_url?: string | null
          confirmed_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          cancelled_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          variant_id: string | null
          product_name: string
          product_sku: string | null
          variant_options: Json
          quantity: number
          unit_price: number
          total: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          variant_id?: string | null
          product_name: string
          product_sku?: string | null
          variant_options?: Json
          quantity?: number
          unit_price: number
          total: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          variant_id?: string | null
          product_name?: string
          product_sku?: string | null
          variant_options?: Json
          quantity?: number
          unit_price?: number
          total?: number
          created_at?: string
        }
      }
      carts: {
        Row: {
          id: string
          company_id: string | null
          user_id: string | null
          session_id: string | null
          status: 'active' | 'converted' | 'abandoned'
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id?: string | null
          user_id?: string | null
          session_id?: string | null
          status?: 'active' | 'converted' | 'abandoned'
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string | null
          user_id?: string | null
          session_id?: string | null
          status?: 'active' | 'converted' | 'abandoned'
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          cart_id: string
          product_id: string
          variant_id: string | null
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cart_id: string
          product_id: string
          variant_id?: string | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cart_id?: string
          product_id?: string
          variant_id?: string | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_company_id: {
        Args: Record<string, never>
        Returns: string
      }
      generate_order_number: {
        Args: Record<string, never>
        Returns: string
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

// ============================================================
// Hilfs-Typen
// ============================================================

// Tabellen-Typen extrahieren
export type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row']

export type InsertTables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Insert']

export type UpdateTables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Update']

// Konkrete Typen
export type Profile = Tables<'profiles'>
export type UserSettings = Tables<'user_settings'>
export type Company = Tables<'companies'>
export type CompanyMember = Tables<'company_members'>
export type Category = Tables<'categories'>
export type Product = Tables<'products'>
export type ProductVariant = Tables<'product_variants'>
export type Order = Tables<'orders'>
export type OrderItem = Tables<'order_items'>
export type Cart = Tables<'carts'>
export type CartItem = Tables<'cart_items'>
