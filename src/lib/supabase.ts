import { createClient } from '@supabase/supabase-js';

// Use import.meta.env for Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Ensure the URL is clean (remove /rest/v1/ if present)
const cleanUrl = (supabaseUrl || "").replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
const anonKey = supabaseAnonKey || "";

export const supabaseConfigured =
  Boolean(cleanUrl) &&
  Boolean(anonKey) &&
  anonKey !== "your-anon-key" &&
  anonKey !== "YOUR_REAL_ANON_KEY" &&
  cleanUrl !== "https://your-project-id.supabase.co";

export const getSupabaseConfigError = () => {
  if (supabaseConfigured) return null;
  return "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (Vercel → Project Settings → Environment Variables) and redeploy.";
};

export const supabase = createClient(
  supabaseConfigured ? cleanUrl : "https://your-project-id.supabase.co",
  supabaseConfigured ? anonKey : "your-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);

// Types for our database
export type Profile = {
  id: string;
  username: string;
  phone: string;
  updated_at?: string;
};
