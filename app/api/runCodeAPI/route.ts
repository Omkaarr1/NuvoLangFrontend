import { NextResponse } from "next/server";
import { runCodeAPI } from "./runCodeAPI";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    const result = await runCodeAPI(code);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      message: "Error executing code",
      compileOutput: "Error: Failed to execute code",
      output: "",
    }, { status: 500 });
  }
}
