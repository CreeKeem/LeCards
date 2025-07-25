const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const deleteSet = async (id: number): Promise<boolean> => {
  try {
    const res = await fetch(`${backendUrl}/user-set-info/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete set");

    return true;
  } catch (error) {
    console.error("Error deleting set:", error);
    return false;
  }
};
