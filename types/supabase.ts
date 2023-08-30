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
      issues: {
        Row: {
          created_at: string | null
          details: string | null
          id: string
          project_id: string
          title: string
          updated_at: string | null
          user_email: string
        }
        Insert: {
          created_at?: string | null
          details?: string | null
          id?: string
          project_id: string
          title: string
          updated_at?: string | null
          user_email: string
        }
        Update: {
          created_at?: string | null
          details?: string | null
          id?: string
          project_id?: string
          title?: string
          updated_at?: string | null
          user_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "issues_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      project_users: {
        Row: {
          created_at: string
          project_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          project_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          project_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_users_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner_id: string
          stripe_subscription_id: string | null
          total_submissions: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          owner_id: string
          stripe_subscription_id?: string | null
          total_submissions?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner_id?: string
          stripe_subscription_id?: string | null
          total_submissions?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ratings: {
        Row: {
          created_at: string | null
          details: string | null
          id: string
          project_id: string
          score: number
          updated_at: string | null
          user_email: string
        }
        Insert: {
          created_at?: string | null
          details?: string | null
          id?: string
          project_id: string
          score: number
          updated_at?: string | null
          user_email: string
        }
        Update: {
          created_at?: string | null
          details?: string | null
          id?: string
          project_id?: string
          score?: number
          updated_at?: string | null
          user_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      suggestions: {
        Row: {
          created_at: string | null
          details: string | null
          id: string
          project_id: string
          title: string
          updated_at: string | null
          user_email: string
        }
        Insert: {
          created_at?: string | null
          details?: string | null
          id?: string
          project_id: string
          title: string
          updated_at?: string | null
          user_email: string
        }
        Update: {
          created_at?: string | null
          details?: string | null
          id?: string
          project_id?: string
          title?: string
          updated_at?: string | null
          user_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "suggestions_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          preferred_name: string | null
          project_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          preferred_name?: string | null
          project_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          preferred_name?: string | null
          project_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
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
