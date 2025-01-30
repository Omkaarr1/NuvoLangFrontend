"use server";

import { runCodeAPI } from "@/app/api/runCodeAPI/runCodeAPI";

export async function runCode(code: string) {
  try {
    return await runCodeAPI(code);
  } catch (error) {
    console.error("Error running code:", error);
    return {
      message: "Error running code",
      compileOutput: "Error: Failed to run code",
      output: "",
    };
  }
}
