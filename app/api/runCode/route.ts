import { NextResponse } from "next/server"

export async function runCodeAPI(code: string) {
  try {
    // Send the code to the actual code execution service
    const response = await fetch("http://localhost:8080/runCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any necessary authentication headers
      },
      body: JSON.stringify({ code }),
    })

    if (!response.ok) {
      throw new Error("Failed to execute code")
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error executing code:", error)
    throw error
  }
}

export async function POST(req: Request) {
  const { code } = await req.json()

  try {
    const result = await runCodeAPI(code)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error executing code",
        compileOutput: "Error: Failed to execute code",
        output: "",
      },
      { status: 500 },
    )
  }
}

