import bcrypt from 'bcryptjs';
import { supabase } from './supabase';

/**
 * Register a new user by hashing their password and storing it in Supabase.
 * @param email User's email address
 * @param password Plain text password
 * @param username User's full name or username
 * @param phone User's phone number
 */
export async function registerUser(email: string, password: string, username: string, phone: string) {
  try {
    console.log('Starting registration for:', email);
    
    // 1. Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Password hashed successfully');

    // 2. Store in Supabase
    // Use maybeSingle() which returns null if user doesn't exist (doesn't throw error)
    const { data: existingUser, error: checkError } = await supabase
      .from('user_credentials')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (checkError) {
      console.error('Database check error:', checkError);
      // If it's a real database error (not just "not found"), we should know
    }

    if (existingUser) {
      return { success: false, error: "Email already registered. Please sign in instead." };
    }

    console.log('Inserting new user into database...');
    const { data, error: insertError } = await supabase
      .from('user_credentials')
      .insert([
        { 
          email: email, 
          full_name: username, // Changed from username to full_name
          password: hashedPassword, 
          phone: phone,
          created_at: new Date().toISOString() 
        }
      ])
      .select();

    if (insertError) {
      console.error('Database insertion error:', insertError);
      
      // Handle duplicate email error specifically
      if (insertError.code === '23505') {
        return { 
          success: false, 
          error: "This email is already registered. Please sign in instead." 
        };
      }
      
      throw insertError;
    }

    console.log('Registration successful:', data);
    return { success: true, data };
  } catch (error: any) {
    console.error('Full registration error:', error);
    
    // Special handling for network errors like "Load failed"
    if (error.message === 'Load failed' || error instanceof TypeError) {
      return { 
        success: false, 
        error: "Network Error: Could not connect to Supabase. This usually means the database is paused, the API key is invalid, or an adblocker is blocking the request." 
      };
    }
    
    return { success: false, error: error.message };
  }
}

/**
 * Log in a user by comparing entered password with the stored hash.
 * @param email User's email address
 * @param password Plain text password
 */
export async function loginUser(email: string, password: string) {
  try {
    // 1. Fetch the hashed password from the database
    const { data, error } = await supabase
      .from('user_credentials')
      .select('password, full_name') // Changed from username to full_name
      .eq('email', email)
      .single();

    if (error) {
      console.error('Login fetch error:', error);
      if (error.code === 'PGRST116') {
        throw new Error('User not found');
      }
      throw error;
    }

    if (!data || !data.password) {
      throw new Error('Invalid credentials');
    }

    // 2. Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, data.password);

    if (isMatch) {
      return { 
        success: true, 
        message: 'Login successful',
        username: data.full_name // Map full_name back to username for the UI
      };
    } else {
      return { success: false, message: 'Invalid password' };
    }
  } catch (error: any) {
    console.error('Full login error:', error);
    
    // Special handling for network errors like "Load failed"
    if (error.message === 'Load failed' || error instanceof TypeError) {
      return { 
        success: false, 
        error: "Network Error: Could not connect to Supabase. This usually means the database is paused, the API key is invalid, or an adblocker is blocking the request." 
      };
    }
    
    return { success: false, error: error.message };
  }
}
