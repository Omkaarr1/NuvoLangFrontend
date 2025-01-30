"use client"

import { useState } from "react"
import { CodeEditor } from "@/components/code-editor"
import { OutputDisplay } from "@/components/output-display"
import { AiChat } from "@/components/ai-chat"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Keywords } from "@/components/keywords"
import { runCode } from "./actions"

const sampleCode = `use database;
use blockchain;
use data_science;
use ml;

// Variable Assignments and Arithmetic Operations
x = 10;
x = x + 5;
print->"Value of x = " + x;

// Conditional Statement
if (x > 10) { 
    print->"x is greater than 10"; 
} else { 
    print->"x is not greater than 10"; 
}

// Encrypted Variable
@ENCsecret = "mySecretValue";
print->"Encrypted secret = " + @ENCsecret;

// Event Trigger
@EVENT_TRIGGER(2, "seconds",2) -> print->"Hello";

// Function Definition and Call
function add(a, b) {
    return a + b;
};

result = add(10, 20);
print->"Result of add function = " + result;
`

export default function Home() {
  const [code, setCode] = useState(sampleCode)
  const [output, setOutput] = useState<{ message: string; compileOutput: string; output: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showOutput, setShowOutput] = useState(false)

  const handleRunCode = async () => {
    setIsLoading(true)
    setShowOutput(false)

    try {
      const result = await runCode(code)
      setOutput(result)
      setShowOutput(true)
    } catch (error) {
      console.error("Error running code:", error)
      setOutput({
        message: "Error running code",
        compileOutput: "Error: Failed to run code",
        output: "",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Code Editor</h1>
        <ThemeToggle />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <CodeEditor code={code} setCode={setCode} />
          <Button onClick={handleRunCode} disabled={isLoading}>
            {isLoading ? "Running..." : "Run Code"}
          </Button>
          {showOutput && output && <OutputDisplay output={output} onGoBack={() => setShowOutput(false)} />}
        </div>
        <div>
          <AiChat />
        </div>
      </div>
    </div>
  )
}

