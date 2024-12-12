export const getAllUsers = async () => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!resp.ok) {
      throw new Error("Failed to fetch users");
    }

    return await resp.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};
