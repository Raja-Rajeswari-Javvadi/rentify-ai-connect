export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      booking_requests: {
        Row: {
          created_at: string | null
          finder_id: string
          id: string
          message: string | null
          property_id: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          finder_id: string
          id?: string
          message?: string | null
          property_id: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          finder_id?: string
          id?: string
          message?: string | null
          property_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_requests_finder_id_fkey"
            columns: ["finder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
    Enums: {
      house_type: "1BHK" | "2BHK" | "3BHK" | "4BHK" | "Studio" | "Villa";
    };
    properties: {
      Row: {
        address: string;                  // Address of the property
        bedrooms: number;                 // Number of bedrooms in the property
        created_at: string | null;        // Timestamp when the property was created (nullable)
        description: string | null;       // Property description (nullable)
        has_water_facility: boolean | null; // Indicates if the property has water facility
        house_type: Database["public"]["Enums"]["house_type"]; // Type of the house (from the Enum)
        id: string;                       // Unique ID for the property (UUID)
        is_available: boolean | null;     // Whether the property is available or not
        latitude: number | null;          // Latitude of the property (nullable)
        longitude: number | null;         // Longitude of the property (nullable)
        meter_type: string | null;        // Type of meter (nullable)
        owner_id: string;                 // ID of the property owner (foreign key)
        rent_per_month: number;           // Monthly rent of the property
        title: string;                    // Title of the property
        updated_at: string | null;        // Timestamp of the last update (nullable)
      };
      Insert: {
        address: string;                    // Address of the property
        bedrooms: number;                   // Number of bedrooms
        created_at?: string | null;         // Optional: If provided, when the property is created
        description?: string | null;        // Optional description
        has_water_facility?: boolean | null; // Optional water facility info
        house_type: Database["public"]["Enums"]["house_type"]; // Type of house (from enum)
        id?: string;                        // Optional: ID, will auto-generate if not provided
        is_available?: boolean | null;      // Optional: availability status
        latitude?: number | null;           // Optional: latitude
        longitude?: number | null;          // Optional: longitude
        meter_type?: string | null;         // Optional: meter type
        owner_id: string;                   // The ID of the owner (required)
        rent_per_month: number;             // Rent price per month
        title: string;                      // Property title
        updated_at?: string | null;         // Optional: update timestamp
      };
      Update: {
        address?: string;                    // Optional address
        bedrooms?: number;                   // Optional bedrooms count
        created_at?: string | null;          // Optional creation timestamp
        description?: string | null;         // Optional description
        has_water_facility?: boolean | null; // Optional water facility info
        house_type?: Database["public"]["Enums"]["house_type"]; // Optional house type (from enum)
        id?: string;                         // Optional ID (should be provided when updating)
        is_available?: boolean | null;       // Optional availability
        latitude?: number | null;            // Optional latitude
        longitude?: number | null;           // Optional longitude
        meter_type?: string | null;          // Optional meter type
        owner_id?: string;                   // Optional: owner ID (should be provided when updating)
        rent_per_month?: number;             // Optional rent price
        title?: string;                      // Optional title
        updated_at?: string | null;          // Optional update timestamp
      };
      Relationships: [
        {
          foreignKeyName: "properties_owner_id_fkey";
          columns: ["owner_id"];
          isOneToOne: false;
          referencedRelation: "profiles";
          referencedColumns: ["id"];
        }
      ];
    };
    property_images: {
      Row: {
        created_at: string | null;         // Timestamp when the image was uploaded (nullable)
        id: string;                        // Unique ID for the image (UUID)
        image_url: string;                 // URL to the image
        is_primary: boolean | null;        // Whether this image is the primary image
        property_id: string;               // ID of the associated property (foreign key)
      };
      Insert: {
        created_at?: string | null;         // Optional: If provided, when the image is uploaded
        id?: string;                        // Optional: Image ID, will auto-generate if not provided
        image_url: string;                  // URL of the image (required)
        is_primary?: boolean | null;        // Optional: Whether this image is the primary image
        property_id: string;                // The ID of the associated property (required)
      };
      Update: {
        created_at?: string | null;         // Optional: upload timestamp
        id?: string;                        // Optional: Image ID (should be provided when updating)
        image_url?: string;                 // Optional: New image URL
        is_primary?: boolean | null;        // Optional: Whether this image should be the primary one
        property_id?: string;               // Optional: Property ID (should be provided when updating)
      };
      Relationships: [
        {
          foreignKeyName: "property_images_property_id_fkey";
          columns: ["property_id"];
          isOneToOne: false;
          referencedRelation: "properties";
          referencedColumns: ["id"];
        }
      ];
    };

    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      house_type: "1BHK" | "2BHK" | "3BHK" | "4BHK" | "Studio" | "Villa"
      user_role: "owner" | "finder"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      house_type: ["1BHK", "2BHK", "3BHK", "4BHK", "Studio", "Villa"],
      user_role: ["owner", "finder"],
    },
  },
} as const
