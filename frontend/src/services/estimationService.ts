const estimationService = {
  saveEstimation: async (data: any) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.token) {
      throw new Error("Not authenticated");
    }

    const response = await fetch("/history/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to save estimation");
    }

    return await response.json();
  },

  getEstimations: async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.token) {
      throw new Error("Not authenticated");
    }

    const response = await fetch("/history/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to fetch estimations");
    }

    return await response.json();
  },
};

export default estimationService;
