const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchUserCardInfo = async (userId: number, cardId: number) => {
  try {
    const res = await fetch(
      `${backendUrl}/user-card-info/user/${userId}/card/${cardId}`
    );
    if (!res.ok) throw new Error("Failed to fetch user card info");
    return await res.json();
  } catch (error) {
    console.error("Error fetching user card info:", error);
    return null;
  }
};

export const fetchSetUserCardInfo = async (userId: number, setId: number) => {
  try {
    const res = await fetch(
      `${backendUrl}/user-card-info/user/${userId}/set/${setId}`
    );
    if (!res.ok) throw new Error("Failed to fetch set user card info");
    return await res.json();
  } catch (error) {
    console.error("Error fetching set user card info:", error);
    return null;
  }
};
