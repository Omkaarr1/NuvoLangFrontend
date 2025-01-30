import { Button } from "@/components/ui/button"

interface OutputDisplayProps {
  output: {
    message: string
    compileOutput: string
    output: string
  }
  onGoBack: () => void
}

export function OutputDisplay({ output, onGoBack }: OutputDisplayProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Execution Status</h2>
        <pre className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
          {output.message || "No execution status available."}
        </pre>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Compilation Output</h2>
        <pre className="p-2 bg-gray-100 dark:bg-gray-800 rounded whitespace-pre-wrap">
          {output.compileOutput || "No compilation output available."}
        </pre>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Program Output</h2>
        <pre className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
          {output.output || "No program output available."}
        </pre>
      </div>  
    </div>
  )
}

