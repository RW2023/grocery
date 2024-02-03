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
      books: {
        Row: {
          author: string
          cover_image_url: string | null
          description: string | null
          format: string | null
          genre: string | null
          id: number
          isbn: string | null
          published_year: number | null
          title: string
        }
        Insert: {
          author: string
          cover_image_url?: string | null
          description?: string | null
          format?: string | null
          genre?: string | null
          id?: number
          isbn?: string | null
          published_year?: number | null
          title: string
        }
        Update: {
          author?: string
          cover_image_url?: string | null
          description?: string | null
          format?: string | null
          genre?: string | null
          id?: number
          isbn?: string | null
          published_year?: number | null
          title?: string
        }
        Relationships: []
      }
      borrowings: {
        Row: {
          book_id: number
          borrow_date: string
          id: number
          member_id: number
          return_date: string | null
        }
        Insert: {
          book_id: number
          borrow_date: string
          id?: number
          member_id: number
          return_date?: string | null
        }
        Update: {
          book_id?: number
          borrow_date?: string
          id?: number
          member_id?: number
          return_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "borrowings_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "borrowings_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "familymembers"
            referencedColumns: ["id"]
          }
        ]
      }
      drivers: {
        Row: {
          driver_id: number
          email: string | null
          name: string | null
          run_assignment: number | null
        }
        Insert: {
          driver_id?: number
          email?: string | null
          name?: string | null
          run_assignment?: number | null
        }
        Update: {
          driver_id?: number
          email?: string | null
          name?: string | null
          run_assignment?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "drivers_run_assignment_fkey"
            columns: ["run_assignment"]
            isOneToOne: false
            referencedRelation: "runs"
            referencedColumns: ["run_id"]
          }
        ]
      }
      familymembers: {
        Row: {
          email: string | null
          id: number
          name: string
          role: string | null
        }
        Insert: {
          email?: string | null
          id?: number
          name: string
          role?: string | null
        }
        Update: {
          email?: string | null
          id?: number
          name?: string
          role?: string | null
        }
        Relationships: []
      }
      games: {
        Row: {
          description: string | null
          game_id: number
          name: string
        }
        Insert: {
          description?: string | null
          game_id?: number
          name: string
        }
        Update: {
          description?: string | null
          game_id?: number
          name?: string
        }
        Relationships: []
      }
      grocery_inventory: {
        Row: {
          Food_Group: string | null
          Health: boolean | null
          id: number
          name: string
          quantity: number
        }
        Insert: {
          Food_Group?: string | null
          Health?: boolean | null
          id?: number
          name: string
          quantity: number
        }
        Update: {
          Food_Group?: string | null
          Health?: boolean | null
          id?: number
          name?: string
          quantity?: number
        }
        Relationships: []
      }
      matches: {
        Row: {
          game_id: number | null
          match_id: number
          player1_score: number
          player2_score: number
          winner: string
        }
        Insert: {
          game_id?: number | null
          match_id?: number
          player1_score: number
          player2_score: number
          winner: string
        }
        Update: {
          game_id?: number | null
          match_id?: number
          player1_score?: number
          player2_score?: number
          winner?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["game_id"]
          }
        ]
      }
      meal_planning: {
        Row: {
          date: string
          id: number
          meal_type: string
          recipe_id: number | null
        }
        Insert: {
          date: string
          id?: number
          meal_type: string
          recipe_id?: number | null
        }
        Update: {
          date?: string
          id?: number
          meal_type?: string
          recipe_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_planning_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          }
        ]
      }
      mileage_records: {
        Row: {
          end_mileage: number
          end_time: string
          id: number
          start_mileage: number
          start_time: string
        }
        Insert: {
          end_mileage: number
          end_time: string
          id?: number
          start_mileage: number
          start_time: string
        }
        Update: {
          end_mileage?: number
          end_time?: string
          id?: number
          start_mileage?: number
          start_time?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          description: string
          github_url: string | null
          id: number
          image_url: string | null
          live_url: string | null
          title: string
        }
        Insert: {
          description: string
          github_url?: string | null
          id?: number
          image_url?: string | null
          live_url?: string | null
          title: string
        }
        Update: {
          description?: string
          github_url?: string | null
          id?: number
          image_url?: string | null
          live_url?: string | null
          title?: string
        }
        Relationships: []
      }
      recipe_ingredients: {
        Row: {
          grocery_item_id: number
          recipe_id: number
        }
        Insert: {
          grocery_item_id: number
          recipe_id: number
        }
        Update: {
          grocery_item_id?: number
          recipe_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_grocery_item_id_fkey"
            columns: ["grocery_item_id"]
            isOneToOne: false
            referencedRelation: "grocery_inventory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          }
        ]
      }
      recipes: {
        Row: {
          description: string | null
          id: number
          "Main Ingredient": string | null
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          "Main Ingredient"?: string | null
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          "Main Ingredient"?: string | null
          name?: string
        }
        Relationships: []
      }
      runs: {
        Row: {
          building_access: string | null
          day_of_week: string | null
          description: string | null
          items_to_remember: string | null
          route_description: string | null
          run_id: number
          run_label: string | null
        }
        Insert: {
          building_access?: string | null
          day_of_week?: string | null
          description?: string | null
          items_to_remember?: string | null
          route_description?: string | null
          run_id?: number
          run_label?: string | null
        }
        Update: {
          building_access?: string | null
          day_of_week?: string | null
          description?: string | null
          items_to_remember?: string | null
          route_description?: string | null
          run_id?: number
          run_label?: string | null
        }
        Relationships: []
      }
      runstops: {
        Row: {
          run_id: number | null
          run_stop_id: number
          stop_id: number | null
          stop_order: number | null
        }
        Insert: {
          run_id?: number | null
          run_stop_id?: number
          stop_id?: number | null
          stop_order?: number | null
        }
        Update: {
          run_id?: number | null
          run_stop_id?: number
          stop_id?: number | null
          stop_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "runstops_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "runs"
            referencedColumns: ["run_id"]
          },
          {
            foreignKeyName: "runstops_stop_id_fkey"
            columns: ["stop_id"]
            isOneToOne: false
            referencedRelation: "stops"
            referencedColumns: ["stop_id"]
          }
        ]
      }
      shopping_list: {
        Row: {
          id: number
          isbought: boolean | null
          name: string
          quantity: number
        }
        Insert: {
          id?: number
          isbought?: boolean | null
          name: string
          quantity: number
        }
        Update: {
          id?: number
          isbought?: boolean | null
          name?: string
          quantity?: number
        }
        Relationships: []
      }
      stops: {
        Row: {
          building_access: string | null
          delivery_instructions: string | null
          hospital_address: string | null
          hospital_name: string | null
          image_url: string | null
          Item_needed: string | null
          pickup_instructions: string | null
          stop_id: number
          stop_name: string | null
        }
        Insert: {
          building_access?: string | null
          delivery_instructions?: string | null
          hospital_address?: string | null
          hospital_name?: string | null
          image_url?: string | null
          Item_needed?: string | null
          pickup_instructions?: string | null
          stop_id?: number
          stop_name?: string | null
        }
        Update: {
          building_access?: string | null
          delivery_instructions?: string | null
          hospital_address?: string | null
          hospital_name?: string | null
          image_url?: string | null
          Item_needed?: string | null
          pickup_instructions?: string | null
          stop_id?: number
          stop_name?: string | null
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
