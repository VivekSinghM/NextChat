import { createClient } from "@supabase/supabase-js";
import { CustomDatabase } from "../types/customSchema";

// Define a function to create a Supabase client for client-side operations
export const supabase = createClient<CustomDatabase>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
