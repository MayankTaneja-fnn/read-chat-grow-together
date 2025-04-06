
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  RotateCcw, 
  Sparkles,
  Languages,
  BrainCircuit,
  Pencil,
  Check,
  Globe
} from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

interface ChatAssistantPanelProps {
  isDyslexicFont: boolean;
  letterSpacing: number[];
  fontType: string;
}

const ChatAssistantPanel: React.FC<ChatAssistantPanelProps> = ({
  isDyslexicFont,
  letterSpacing,
  fontType
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 I'm your reading assistant. I can help simplify text, correct grammar, or convert Hindi transliterated text. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transliterateInput, setTransliterateInput] = useState("");
  const [transliterateOutput, setTransliterateOutput] = useState("");
  const [grammarInput, setGrammarInput] = useState("");
  const [grammarOutput, setGrammarOutput] = useState("");
  const [transliterateMode, setTransliterateMode] = useState<"hindiToEnglish" | "englishToHindi">("hindiToEnglish");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getFontClass = () => {
    switch(fontType) {
      case 'OpenDyslexic':
        return 'font-dyslexic';
      case 'Roboto':
        return 'font-roboto';
      case 'Arial':
        return 'font-arial';
      default:
        return 'font-sans';
    }
  };

  const textStyle = {
    letterSpacing: `${letterSpacing[0]}em`,
  };

  const fontClass = getFontClass();

  useEffect(() => {
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
  }, [messages, toast, letterSpacing]);

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

    // Process the input for potential responses
    processUserMessage(input);
  };

  const processUserMessage = (userInput: string) => {
    setTimeout(() => {
      let responseText = "I'm here to help you with reading and understanding text.";
      const lowerInput = userInput.toLowerCase();
      
      // Check for Hindi transliteration requests
      if (lowerInput.includes("translate") || lowerInput.includes("hindi") || 
          lowerInput.includes("kya") || lowerInput.includes("hai") || 
          lowerInput.includes("transliterate")) {
        responseText = "It looks like you want to transliterate text! 🌐\n\n" +
                       "I can convert Hindi transliterated text like 'Kya hal hai' to English or proper Hindi.\n\n" +
                       "You can use our transliteration tool in the Tools tab. Would you like me to help you with that?";
      } 
      // Check for grammar correction requests
      else if (lowerInput.includes("grammar") || lowerInput.includes("correct") || 
               lowerInput.includes("fix") || lowerInput.includes("spelling")) {
        responseText = "I can help with grammar and spelling corrections! ✏️\n\n" +
                       "Our grammar correction tool can help identify and fix common errors. You can find it in the Tools tab.\n\n" +
                       "Would you like me to check some text for you? Just paste it and I'll help you improve it.";
      }
      // Check for simplification requests
      else if (lowerInput.includes("explain") || lowerInput.includes("simplify") || 
               lowerInput.includes("what is") || lowerInput.includes("how to")) {
        responseText = "I'd be happy to simplify that for you! 🧠\n\n" + 
                      "Sometimes complex language can be difficult. Let me break this down:\n\n" + 
                      "This concept means taking something complicated and explaining it in simpler terms, using everyday language and examples that are easier to understand.";
      }
      // Check for reading difficulty related questions
      else if (lowerInput.includes("dyslexia") || lowerInput.includes("reading difficulty") ||
               lowerInput.includes("hard to read")) {
        responseText = "Reading difficulties like dyslexia can be challenging. 📚\n\n" +
                       "Some helpful strategies include:\n" +
                       "• Using the OpenDyslexic font (you can select it in the Accessibility Settings)\n" +
                       "• Adjusting letter spacing (also in Accessibility Settings)\n" +
                       "• Using our text-to-speech feature\n" +
                       "• Breaking down text into smaller chunks\n\n" +
                       "Would you like me to help you set up these features?";
      }
      // Generic responses
      else {
        responseText = "I'm here to assist you with reading and communication! 👋\n\n" + 
                      "I can:\n" +
                      "• Help simplify complex text\n" +
                      "• Correct grammar and spelling\n" +
                      "• Transliterate between Hindi and English\n" +
                      "• Suggest responses for easier communication\n\n" +
                      "What would you like help with today?";
      }
      
      setIsThinking(false);
      
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1500);
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
        text: "Hi there! 👋 I'm your reading assistant. I can help simplify text, correct grammar, or convert Hindi transliterated text. How can I help you today?",
        sender: "assistant",
        timestamp: new Date(),
      },
    ]);
    toast({
      title: "Chat cleared",
      description: "The conversation has been reset.",
    });
  };

  const handleTransliterate = () => {
    if (!transliterateInput.trim()) {
      toast({
        title: "No text to transliterate",
        description: "Please enter some text first.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Transliterating...",
      description: "Please wait while processing your text.",
    });

    // Simple mock transliteration (for demo purposes)
    setTimeout(() => {
      let result = transliterateInput;
      
      if (transliterateMode === "hindiToEnglish") {
        // Mock Hindi transliterated text to English
        const hindiToEnglishMap: Record<string, string> = {
          "kya": "what",
          "hai": "is",
          "aap": "you",
          "kaise": "how",
          "ho": "are",
          "main": "I",
          "hoon": "am",
          "theek": "fine",
          "dhanyavaad": "thank you",
          "namaste": "hello"
        };
        
        result = transliterateInput.split(" ")
          .map(word => hindiToEnglishMap[word.toLowerCase()] || word)
          .join(" ");
      } else {
        // Mock English to Hindi transliterated
        const englishToHindiMap: Record<string, string> = {
          "what": "kya",
          "is": "hai",
          "you": "aap",
          "how": "kaise",
          "are": "ho",
          "i": "main",
          "am": "hoon",
          "fine": "theek",
          "thank": "dhanyavaad",
          "hello": "namaste"
        };
        
        result = transliterateInput.split(" ")
          .map(word => englishToHindiMap[word.toLowerCase()] || word)
          .join(" ");
      }
      
      setTransliterateOutput(result);
      
      toast({
        title: "Transliteration complete",
        description: "Your text has been transliterated.",
      });
    }, 1000);
  };

  const handleGrammarCorrection = () => {
    if (!grammarInput.trim()) {
      toast({
        title: "No text to correct",
        description: "Please enter some text first.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Checking grammar...",
      description: "Please wait while analyzing your text.",
    });

    // Simple mock grammar correction (for demo purposes)
    setTimeout(() => {
      // Apply some simple corrections
      let corrected = grammarInput
        .replace(/teh/gi, "the")
        .replace(/thier/gi, "their")
        .replace(/alot/gi, "a lot")
        .replace(/i ([a-z])/gi, (match, p1) => `I ${p1}`)
        .replace(/([.!?]) ([a-z])/g, (match, p1, p2) => `${p1} ${p2.toUpperCase()}`);
      
      setGrammarOutput(corrected);
      
      toast({
        title: "Grammar check complete",
        description: "Your text has been analyzed and corrected.",
      });
    }, 1200);
  };

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <span>Chat Assistant & Language Tools</span>
        </CardTitle>
        <CardDescription>
          Get help with reading, grammar correction, and transliteration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chat">
          <TabsList className="mb-4">
            <TabsTrigger value="chat">
              <MessageCircle className="h-4 w-4 mr-2" /> 
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="tools">
              <Sparkles className="h-4 w-4 mr-2" /> 
              Tools
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="h-[500px] flex flex-col">
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
                      <p className={`text-sm whitespace-pre-line ${fontClass}`} style={textStyle}>
                        {msg.text}
                      </p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start">
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

            <div className="flex flex-col mt-auto">
              <div className="flex items-center space-x-2 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearChat}
                  className="flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" /> 
                  Clear Chat
                </Button>
                
                <div className="flex-1"></div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInput("Can you help me simplify complex text?");
                  }}
                  className="text-xs"
                >
                  Simplify text
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInput("Help with grammar correction");
                  }}
                  className="text-xs"
                >
                  Grammar help
                </Button>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleListening}
                  className={isListening ? "bg-red-100 text-red-600 border-red-300 dark:bg-red-900 dark:text-red-300" : ""}
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
                  className={`${fontClass}`}
                  style={textStyle}
                />
                <Button 
                  onClick={handleSend} 
                  disabled={input.trim() === "" || isListening}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tools" className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-medium">Hindi-English Transliteration</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-4 mb-2">
                  <Button
                    variant={transliterateMode === "hindiToEnglish" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTransliterateMode("hindiToEnglish")}
                  >
                    Hindi → English
                  </Button>
                  <Button
                    variant={transliterateMode === "englishToHindi" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTransliterateMode("englishToHindi")}
                  >
                    English → Hindi
                  </Button>
                </div>
                
                <Textarea
                  placeholder={transliterateMode === "hindiToEnglish" ? "Enter Hindi transliterated text (e.g., 'Kya hal hai')" : "Enter English text to transliterate"}
                  value={transliterateInput}
                  onChange={(e) => setTransliterateInput(e.target.value)}
                  className={`min-h-[100px] ${fontClass}`}
                  style={textStyle}
                />
                
                <div className="flex gap-2">
                  <Button onClick={handleTransliterate} className="flex items-center gap-1">
                    <Languages className="h-4 w-4" />
                    Transliterate
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setTransliterateInput("");
                      setTransliterateOutput("");
                    }}
                  >
                    Clear
                  </Button>
                </div>
                
                {transliterateOutput && (
                  <div className="mt-4 p-4 border rounded-lg bg-secondary/30">
                    <p className="text-sm font-medium mb-2">Transliterated Text:</p>
                    <p className={fontClass} style={textStyle}>{transliterateOutput}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Pencil className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-medium">Grammar & Spelling Correction</h3>
              </div>
              
              <div className="space-y-3">
                <Textarea
                  placeholder="Enter text to check grammar and spelling..."
                  value={grammarInput}
                  onChange={(e) => setGrammarInput(e.target.value)}
                  className={`min-h-[100px] ${fontClass}`}
                  style={textStyle}
                />
                
                <div className="flex gap-2">
                  <Button onClick={handleGrammarCorrection} className="flex items-center gap-1">
                    <Check className="h-4 w-4" />
                    Check Grammar
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setGrammarInput("");
                      setGrammarOutput("");
                    }}
                  >
                    Clear
                  </Button>
                </div>
                
                {grammarOutput && (
                  <div className="mt-4 p-4 border rounded-lg bg-secondary/30">
                    <p className="text-sm font-medium mb-2">Corrected Text:</p>
                    <p className={`${fontClass} text-green-600 dark:text-green-400`} style={textStyle}>{grammarOutput}</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChatAssistantPanel;
