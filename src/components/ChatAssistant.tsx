
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, Mic, MicOff } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: number;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your reading assistant. I can help simplify text or explain difficult concepts. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response with common questions for dyslexic readers
    setTimeout(() => {
      let responseText = "I'm here to help you with reading and understanding text.";
      
      // Simple response logic based on user input
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("explain") || lowerInput.includes("what is") || lowerInput.includes("how to")) {
        responseText = "That's a good question. Let me simplify this for you: " + 
                      "This concept means taking something complex and breaking it down into simpler parts. " +
                      "Think of it like explaining a video game to someone who's never played before.";
      } else if (lowerInput.includes("read") || lowerInput.includes("text") || lowerInput.includes("help")) {
        responseText = "If you're having trouble with a text, try using our text reader tool. " +
                      "You can also adjust the font, spacing, and size to make it easier to read.";
      } else if (lowerInput.includes("thanks") || lowerInput.includes("thank you")) {
        responseText = "You're welcome! I'm happy I could help. Let me know if you need anything else.";
      }
      
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const toggleListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast({
        title: "Speech Recognition Unavailable",
        description: "Your browser doesn't support speech recognition. Try Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      // Stop listening logic would go here
      setIsListening(false);
      toast({
        title: "Voice input stopped",
      });
      return;
    }

    // In a real app, we would implement the SpeechRecognition API
    setIsListening(true);
    toast({
      title: "Listening...",
      description: "Please speak clearly.",
    });
    
    // Simulate speech recognition result after 3 seconds
    setTimeout(() => {
      setInput(prev => prev + "Can you help me understand this text?");
      setIsListening(false);
      toast({
        title: "Voice input received",
      });
    }, 3000);
  };

  return (
    <Card className="w-full h-[600px] flex flex-col animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-accent" />
          <span>Chat Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4 mb-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleListening}
            className={isListening ? "bg-red-100 text-red-600" : ""}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button onClick={handleSend} disabled={input.trim() === ""}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAssistant;
