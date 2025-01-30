"use client"

import { useState, useEffect } from "react"
import Editor from "@monaco-editor/react"

interface CodeEditorProps {
  code: string
  setCode: (code: string) => void
}

export function CodeEditor({ code, setCode }: CodeEditorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Editor
      height="400px"
      defaultLanguage="javascript"
      value={code}
      onChange={(value) => setCode(value || "")}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
      }}
    />
  )
}

