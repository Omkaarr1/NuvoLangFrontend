"use server"

import { runCodeAPI } from "./api/runCode/route"

export async function runCode(code: string) {
  try {
    const result = await runCodeAPI(code)
    return result
  } catch (error) {
    console.error("Error running code:", error)
    return {
      message: "Error running code",
      compileOutput: "Error: Failed to run code",
      output: "",
    }
  }
}

