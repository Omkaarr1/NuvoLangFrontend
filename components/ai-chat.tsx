"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Send, Bot, User } from 'lucide-react'

export function AiChat() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/aiChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const result = await response.json()
      const aiMessage = { role: "ai" as const, content: result.message }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)
      setMessages((prev) => [...prev, { role: "ai", content: "Error: Failed to get response" }])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [scrollAreaRef])

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${message.role === "ai" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "ai" ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
                }`}
              >
                <div className="flex items-center mb-2">
                  {message.role === "ai" ? <Bot className="mr-2" size={16} /> : <User className="mr-2" size={16} />}
                  <span className="font-semibold">{message.role === "ai" ? "AI" : "You"}</span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="max-w-[80%] rounded-lg p-3 bg-secondary text-secondary-foreground">
                <div className="flex items-center">
                  <Bot className="mr-2" size={16} />
                  <span className="font-semibold">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex w-full space-x-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
