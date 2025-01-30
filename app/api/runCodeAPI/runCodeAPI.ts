export async function runCodeAPI(code: string) {
    try {
      const response = await fetch("http://localhost:8080/runCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to execute code");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error executing code:", error);
      throw error;
    }
  }
  