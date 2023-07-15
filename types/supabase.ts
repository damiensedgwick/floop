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
          title: string
          updated_at: string | null
          user_email: string
        }
        Insert: {
          created_at?: string | null
          details?: string | null
          id?: string
          title: string
          updated_at?: string | null
          user_email: string
        }
        Update: {
          created_at?: string | null
          details?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_email?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner_id: string
          subscription_expiry: string | null
          subscription_type: string
          total_submissions: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          owner_id: string
          subscription_expiry?: string | null
          subscription_type?: string
          total_submissions?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner_id?: string
          subscription_expiry?: string | null
          subscription_type?: string
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
          score: number
          updated_at: string | null
          user_email: string
        }
        Insert: {
          created_at?: string | null
          details?: string | null
          id?: string
          score: number
          updated_at?: string | null
          user_email: string
        }
        Update: {
          created_at?: string | null
          details?: string | null
          id?: string
          score?: number
          updated_at?: string | null
          user_email?: string
        }
        Relationships: []
      }
      suggestions: {
        Row: {
          created_at: string | null
          details: string | null
          id: string
          title: string
          updated_at: string | null
          user_email: string
        }
        Insert: {
          created_at?: string | null
          details?: string | null
          id?: string
          title: string
          updated_at?: string | null
          user_email: string
        }
        Update: {
          created_at?: string | null
          details?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_email?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string | null
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          team_id?: string
          user_id?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
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
