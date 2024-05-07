import { CustomDatabase } from '@/types/customSchema';
import { createBrowserClient } from '@supabase/ssr';

// Define a function to create a Supabase client for client-side operations
export const supabase = createBrowserClient<CustomDatabase>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
