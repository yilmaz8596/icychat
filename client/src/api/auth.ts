import { RegisterProps, LoginProps } from "../types";

export const register = async (data: RegisterProps): Promise<RegisterProps> => {
  try {
    console.log("API URL:", import.meta.env.VITE_API_URL);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check if response has content
    const text = await res.text();
    const responseData = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(responseData.message || "Registration failed");
    }
    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const login = async (data: LoginProps): Promise<LoginProps> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );
    const text = await response.text();
    const responseData = text ? JSON.parse(text) : {};
    if (!response.ok) {
      throw new Error(responseData.message || "Login failed");
    }
    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};
