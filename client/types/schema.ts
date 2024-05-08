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
      chat_members: {
        Row: {
          chat_id: string
          created_at: string
          id: number
          is_admin: boolean
          user_id: string
        }
        Insert: {
          chat_id: string
          created_at?: string
          id?: number
          is_admin?: boolean
          user_id: string
        }
        Update: {
          chat_id?: string
          created_at?: string
          id?: number
          is_admin?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_members_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["public_id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          chat_id: string
          content: Json | null
          created_at: string
          id: string
          sender: string | null
          status: Json
          type: Database["public"]["Enums"]["chat_message_type"]
        }
        Insert: {
          chat_id: string
          content?: Json | null
          created_at?: string
          id?: string
          sender?: string | null
          status: Json
          type: Database["public"]["Enums"]["chat_message_type"]
        }
        Update: {
          chat_id?: string
          content?: Json | null
          created_at?: string
          id?: string
          sender?: string | null
          status?: Json
          type?: Database["public"]["Enums"]["chat_message_type"]
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_fkey"
            columns: ["sender"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["public_id"]
          },
        ]
      }
      chats: {
        Row: {
          created_at: string
          id: string
          image: string | null
          is_group: boolean
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          image?: string | null
          is_group?: boolean
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          image?: string | null
          is_group?: boolean
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          about: string | null
          created_at: string
          first_name: string
          id: string
          image: string | null
          last_name: string | null
          public_id: string
        }
        Insert: {
          about?: string | null
          created_at?: string
          first_name: string
          id?: string
          image?: string | null
          last_name?: string | null
          public_id: string
        }
        Update: {
          about?: string | null
          created_at?: string
          first_name?: string
          id?: string
          image?: string | null
          last_name?: string | null
          public_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
      chat_message_type: "text"
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
