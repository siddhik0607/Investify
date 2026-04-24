import { createClient } from '@supabase/supabase-js';

// Use import.meta.env for Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey === 'your-anon-key' || supabaseAnonKey === 'YOUR_REAL_ANON_KEY') {
  console.warn(
    'Supabase credentials are missing or using placeholders. ' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

// Ensure the URL is clean (remove /rest/v1/ if present)
const cleanUrl = supabaseUrl?.replace(/\/rest\/v1\/?$/, '') || '';

export const supabase = createClient(
  cleanUrl || 'https://your-project-id.supabase.co',
  supabaseAnonKey || 'your-anon-key'
);

// Types for our database
export type Profile = {
  id: string;
  username: string;
  phone: string;
  updated_at?: string;
};
