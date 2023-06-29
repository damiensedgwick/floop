export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      issue: {
        Row: {
          created_at: string | null;
          id: string;
          message: string | null;
          project_id: string;
          title: string;
          user_email: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          message?: string | null;
          project_id: string;
          title: string;
          user_email: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          message?: string | null;
          project_id?: string;
          title?: string;
          user_email?: string;
        };
        Relationships: [
          {
            foreignKeyName: "issue_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "project";
            referencedColumns: ["id"];
          }
        ];
      };
      project: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          owner_id: string;
          submission_count: number | null;
          subscription_expiry: string | null;
          subscription_type: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          owner_id: string;
          submission_count?: number | null;
          subscription_expiry?: string | null;
          subscription_type?: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          owner_id?: string;
          submission_count?: number | null;
          subscription_expiry?: string | null;
          subscription_type?: string;
        };
        Relationships: [];
      };
      project_users: {
        Row: {
          project_id: string;
          user_id: string;
        };
        Insert: {
          project_id: string;
          user_id?: string;
        };
        Update: {
          project_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_users_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "project";
            referencedColumns: ["id"];
          }
        ];
      };
      rating: {
        Row: {
          created_at: string | null;
          id: string;
          message: string | null;
          project_id: string;
          rating: number;
          user_email: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          message?: string | null;
          project_id: string;
          rating: number;
          user_email: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          message?: string | null;
          project_id?: string;
          rating?: number;
          user_email?: string;
        };
        Relationships: [
          {
            foreignKeyName: "rating_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "project";
            referencedColumns: ["id"];
          }
        ];
      };
      suggestion: {
        Row: {
          created_at: string | null;
          id: string;
          message: string | null;
          project_id: string;
          title: string;
          user_email: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          message?: string | null;
          project_id: string;
          title: string;
          user_email: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          message?: string | null;
          project_id?: string;
          title?: string;
          user_email?: string;
        };
        Relationships: [
          {
            foreignKeyName: "suggestion_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "project";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
