import { UserData } from "@/types";

const BASE_API_URL = process.env.BASE_API_URL;
if (!BASE_API_URL) {
  console.error("BASE_API_URL is not defined in the environment variables");
  throw new Error("BASE_API_URL is not defined in the environment variables");
}

export const signUp = async (
  username: string,
  password: string
): Promise<UserData> => {
  const res = await fetch(`${BASE_API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Failed to sign in");
    (error as any).response = data;
    throw error;
  }

  return data;
};

export const signIn = async (
  username: string,
  password: string
): Promise<UserData> => {
  const res = await fetch(`${BASE_API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Failed to sign in");
    (error as any).response = data;
    throw error;
  }

  return data.user as UserData;
};

export const signOut = async (): Promise<void> => {
  const res = await fetch(`${BASE_API_URL}/auth/signout`, {
    method: "POST",
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to log out");
  }
};

export const getCurrentUser = async (): Promise<UserData | null> => {
  const res = await fetch(`${BASE_API_URL}/auth/me`, {
    credentials: "include",
  });

  if (res.status === 401) {
    return null; // Not authenticated
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch current user");
  }

  return data as UserData;
};
