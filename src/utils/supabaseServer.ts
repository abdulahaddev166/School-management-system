/**
 * Server-Side Supabase Client & Context Utility
 * 
 * IMPORTANT SECURITY RULE:
 * This file is for secure server-side environments ONLY (Node.js/Express/Cloud Functions).
 * NEVER import this file into browser/client-side React components!
 * SUPABASE_SECRET_KEY is only accessed here via process.env in server runtime.
 */

import { fromSupabaseUrl, createSupabaseContext } from '@supabase/server';

export interface ServerSupabaseConfig {
  supabaseUrl?: string;
  supabaseSecretKey?: string;
  jwksUrl?: string;
}

/**
 * Initializes server-side Supabase context with JWT / JWKS token validation
 */
export function getServerSupabaseConfig(): ServerSupabaseConfig {
  const supabaseUrl = process.env.SUPABASE_URL || 'https://ogqirofvevcjitxeknmh.supabase.co';
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || '';
  const jwksUrl =
    process.env.SUPABASE_JWKS_URL ||
    'https://ogqirofvevcjitxeknmh.supabase.co/auth/v1/.well-known/jwks.json';

  return {
    supabaseUrl,
    supabaseSecretKey,
    jwksUrl
  };
}

/**
 * Creates a server Supabase context instance for server-side route requests
 */
export async function createServerContext(request: Request, options?: any) {
  const config = getServerSupabaseConfig();
  try {
    return await createSupabaseContext(request, {
      env: {
        SUPABASE_URL: config.supabaseUrl,
        SUPABASE_SECRET_KEY: config.supabaseSecretKey,
        SUPABASE_JWKS_URL: config.jwksUrl,
        ...options?.env
      },
      ...options
    });
  } catch (error) {
    console.warn('Server Supabase Context warning:', error);
    return null;
  }
}

export { fromSupabaseUrl, createSupabaseContext };
