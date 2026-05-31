import { supabase, getSupabaseConfigError } from "./supabase";

const toErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object" && "message" in error && typeof (error as { message?: unknown }).message === "string") {
    return (error as { message: string }).message;
  }
  return "Unknown error";
};

export async function registerUser(email: string, password: string, username: string, phone: string) {
  try {
    const configError = getSupabaseConfigError();
    if (configError) return { success: false, error: configError };

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: username, phone },
      },
    });

    if (error) {
      return { success: false, error: error.message || "Registration failed" };
    }

    if (!data.user) {
      return { success: false, error: "Registration failed: no user returned" };
    }

    return { success: true, data };
  } catch (error: unknown) {
    const message = toErrorMessage(error);

    if (message === "Load failed" || error instanceof TypeError) {
      return { 
        success: false, 
        error: "Network Error: Could not connect to Supabase. This usually means the database is paused, the API key is invalid, or an adblocker is blocking the request." 
      };
    }
    
    return { success: false, error: message };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const configError = getSupabaseConfigError();
    if (configError) return { success: false, error: configError };

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { success: false, error: error.message || "Login failed" };
    }

    const name = (data.user?.user_metadata as { full_name?: string } | null)?.full_name || null;
    return {
      success: true,
      message: "Login successful",
      username: name ?? undefined,
    };
  } catch (error: unknown) {
    const message = toErrorMessage(error);

    if (message === "Load failed" || error instanceof TypeError) {
      return { 
        success: false, 
        error: "Network Error: Could not connect to Supabase. This usually means the database is paused, the API key is invalid, or an adblocker is blocking the request." 
      };
    }
    
    return { success: false, error: message };
  }
}
