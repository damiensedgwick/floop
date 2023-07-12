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
      project_users: {
        Row: {
          created_at: string | null
          project_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          project_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_users_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "project"
            referencedColumns: ["id"]
          }
        ]
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
