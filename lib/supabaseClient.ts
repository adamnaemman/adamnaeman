import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fzdjodhnhnycpuariegq.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseAnonKey !== 'your_supabase_anon_key_here' &&
    supabaseAnonKey.length > 20
  );
};

let clientInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return clientInstance;
};

// Default export safe client wrapper
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_key_here')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
