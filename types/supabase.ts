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
      issue: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          project_id: string
          title: string
          user_email: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          project_id: string
          title: string
          user_email: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          project_id?: string
          title?: string
          user_email?: string
        }
        Relationships: []
      }
      project: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_id: string
          submission_count: number
          subscription_expiry: string | null
          subscription_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_id: string
          submission_count?: number
          subscription_expiry?: string | null
          subscription_type?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
          submission_count?: number
          subscription_expiry?: string | null
          subscription_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      rating: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          project_id: string
          rating: number
          user_email: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          project_id: string
          rating: number
          user_email: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          project_id?: string
          rating?: number
          user_email?: string
        }
        Relationships: []
      }
      suggestion: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          project_id: string
          title: string
          user_email: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          project_id: string
          title: string
          user_email: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          project_id?: string
          title?: string
          user_email?: string
        }
        Relationships: []
      }
      test: {
        Row: {
          created_at: string | null
          id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
        }
        Update: {
          created_at?: string | null
          id?: number
        }
        Relationships: []
      }
      user: {
        Row: {
          confirmation_sent_at: string | null
          confirmed_at: string | null
          created_at: string
          current_sign_in_at: string | null
          current_sign_in_ip: unknown | null
          email: string
          email_change: string | null
          email_change_token: string | null
          first_name: string | null
          id: string
          last_name: string | null
          last_sign_in_at: string | null
          last_sign_in_ip: unknown | null
          password: string
          phone: string | null
          recovery_sent_at: string | null
          remember_me_token: string | null
          sign_in_count: number | null
          updated_at: string
        }
        Insert: {
          confirmation_sent_at?: string | null
          confirmed_at?: string | null
          created_at: string
          current_sign_in_at?: string | null
          current_sign_in_ip?: unknown | null
          email: string
          email_change?: string | null
          email_change_token?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          last_sign_in_at?: string | null
          last_sign_in_ip?: unknown | null
          password: string
          phone?: string | null
          recovery_sent_at?: string | null
          remember_me_token?: string | null
          sign_in_count?: number | null
          updated_at: string
        }
        Update: {
          confirmation_sent_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          current_sign_in_at?: string | null
          current_sign_in_ip?: unknown | null
          email?: string
          email_change?: string | null
          email_change_token?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          last_sign_in_at?: string | null
          last_sign_in_ip?: unknown | null
          password?: string
          phone?: string | null
          recovery_sent_at?: string | null
          remember_me_token?: string | null
          sign_in_count?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
