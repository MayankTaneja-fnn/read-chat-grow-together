import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageCircle, Send, Mic, MicOff, BrainCircuit, RotateCcw, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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
      text: "Hi there! 👋 I'm your reading assistant. I can help simplify text or explain difficult concepts. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
    
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
        }
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Speech recognition error",
          description: "There was an error with speech recognition. Please try again.",
          variant: "destructive",
        });
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [messages, toast]);

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
    setIsThinking(true);

    // Simulate AI response with common questions for dyslexic readers
    setTimeout(() => {
      let responseText = "I'm here to help you with reading and understanding text.";
      
      // Simple response logic based on user input
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("explain") || lowerInput.includes("what is") || lowerInput.includes("how to")) {
        responseText = "That's a good question! 🧠 Let me simplify this for you:\n\n" + 
                      "This concept means taking something complex and breaking it down into simpler parts. " +
                      "Think of it like explaining a video game to someone who's never played before - you start with the basics and gradually add details.";
      } else if (lowerInput.includes("dyslexia") || lowerInput.includes("reading difficulty")) {
        responseText = "Dyslexia is a learning difference that makes it harder to read, write, and spell. 📚\n\n" +
                       "It's not related to intelligence - many brilliant people have dyslexia! Some helpful strategies include:\n" +
                       "• Using larger text and special fonts\n" +
                       "• Taking breaks while reading\n" +
                       "• Using text-to-speech tools\n" +
                       "• Breaking information into smaller chunks";
      } else if (lowerInput.includes("read") || lowerInput.includes("text") || lowerInput.includes("help")) {
        responseText = "If you're having trouble with a text, try these tips: 📝\n\n" +
                      "• Use our text reader tool with the OpenDyslexic font\n" +
                      "• Adjust the spacing and font size\n" +
                      "• Try the text-to-speech feature to listen instead of reading\n" +
                      "• Break down long paragraphs into smaller sections\n\n" +
                      "Would you like me to help you understand a specific text?";
      } else if (lowerInput.includes("thanks") || lowerInput.includes("thank you")) {
        responseText = "You're welcome! 😊 I'm happy I could help. Let me know if you need anything else.";
      } else if (lowerInput.includes("summarize") || lowerInput.includes("summary")) {
        responseText = "To summarize a text:\n\n" +
                       "1. Paste your text in the Text Reader section\n" +
                       "2. Click the 'Summarize' button\n" +
                       "3. The summary will appear in the Summary tab\n\n" +
                       "This helps you understand the main points without reading the entire text. Would you like to try it now?";
      } else if (lowerInput.includes("convert") || lowerInput.includes("hinglish") || lowerInput.includes("english")) {
        responseText = "You can convert between Hinglish and English using our Language Tools section! 🌐\n\n" +
                       "Just type your text, select the conversion direction (Hinglish → English or English → Hinglish), and click Convert. This can be really helpful when you're more comfortable reading in one language over the other.";
      } else if (lowerInput.includes("spelling") || lowerInput.includes("spell") || lowerInput.includes("correct")) {
        responseText = "Our spelling correction tool can help fix common spelling mistakes! ✅\n\n" + 
                       "Go to the Language Tools section, select the Spelling Correction tab, enter your text, and click 'Check Spelling'. It's a great way to make sure your writing is clear and accurate.";
      } else {
        responseText = "I'm here to help! 👋 I can:\n\n" + 
                      "• Explain difficult concepts in simple terms\n" +
                      "• Provide tips for reading with dyslexia\n" +
                      "• Help you use our tools like text-to-speech, summarization, and language conversion\n\n" +
                      "What would you like assistance with today?";
      }
      
      setIsThinking(false);
      
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    }, 2000);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech Recognition Unavailable",
        description: "Your browser doesn't support speech recognition. Try Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    toast({
      title: "Listening...",
      description: "Please speak clearly.",
    });
    
    recognitionRef.current.start();
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hi there! 👋 I'm your reading assistant. I can help simplify text or explain difficult concepts. How can I help you today?",
        sender: "assistant",
        timestamp: new Date(),
      },
    ]);
    toast({
      title: "Chat cleared",
      description: "The conversation has been reset.",
    });
  };

  return (
    <Card className="w-full h-[600px] flex flex-col animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-accent" />
              <span>Chat Assistant</span>
              <Sparkles className="h-4 w-4 text-yellow-500" />
            </CardTitle>
            <CardDescription>
              Ask questions about text or get reading help
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={clearChat} className="flex items-center gap-1">
            <RotateCcw className="h-3 w-3" /> 
            Clear Chat
          </Button>
        </div>
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
                {msg.sender === "assistant" && (
                  <Avatar className="h-8 w-8 mr-2">
                    <BrainCircuit className="h-4 w-4 text-primary" />
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {msg.sender === "user" && (
                  <Avatar className="h-8 w-8 ml-2 bg-accent text-accent-foreground">
                    <span className="text-xs">You</span>
                  </Avatar>
                )}
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <Avatar className="h-8 w-8 mr-2">
                  <BrainCircuit className="h-4 w-4 text-primary animate-pulse" />
                </Avatar>
                <div className="bg-secondary rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-accent rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-accent rounded-full animate-pulse delay-100"></div>
                    <div className="h-2 w-2 bg-accent rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleListening}
            className={isListening ? "bg-red-100 text-red-600 border-red-300" : ""}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Input
            placeholder={isListening ? "Listening..." : "Type a message..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isListening}
          />
          <Button 
            onClick={handleSend} 
            disabled={input.trim() === "" || isListening}
            className="group"
          >
            <Send className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAssistant;
