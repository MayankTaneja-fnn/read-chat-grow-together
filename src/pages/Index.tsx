
import React, { useState, useRef } from "react";
import NavBar from "@/components/NavBar";
import AccessibilitySettings from "@/components/AccessibilitySettings";
import TextProcessingPanel from "@/components/TextProcessingPanel";
import GrammarCorrectionPanel from "@/components/GrammarCorrectionPanel";
import TextReader from "@/components/TextReader";
import ChatAssistantPanel from "@/components/ChatAssistantPanel";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  // Font and accessibility settings
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);
  const [fontType, setFontType] = useState("Roboto");
  const [letterSpacing, setLetterSpacing] = useState([0.025]);
  
  // Text processing state
  const [text, setText] = useState("");
  const [processedText, setProcessedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Speech synthesis
  const synth = useRef(window.speechSynthesis);
  const speechUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  
  const { toast } = useToast();

  const startReading = () => {
    if (text.trim() === "") {
      toast({
        title: "No text to read",
        description: "Please enter some text first",
        variant: "destructive",
      });
      return;
    }

    if (speechUtterance.current) {
      synth.current.cancel();
    }

    speechUtterance.current = new SpeechSynthesisUtterance(text);
    speechUtterance.current.onend = () => {
      toast({
        title: "Reading finished",
        description: "Text-to-speech completed successfully.",
      });
    };
    
    synth.current.speak(speechUtterance.current);
    
    toast({
      title: "Reading started",
      description: "Text is being read aloud.",
    });
  };

  const summarizeText = () => {
    if (text.trim() === "") {
      toast({
        title: "No text to summarize",
        description: "Please enter some text first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call or processing delay
    setTimeout(() => {
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      let simpleSummary = "";
      
      if (sentences.length <= 3) {
        simpleSummary = text;
      } else {
        simpleSummary = sentences.slice(0, 2).join(" ");
        
        if (sentences.length > 4) {
          simpleSummary += " [...] " + sentences[sentences.length - 2];
        }
        
        if (sentences.length > 5) {
          simpleSummary += " " + sentences[sentences.length - 1];
        }
      }
      
      setProcessedText(simpleSummary);
      setIsProcessing(false);
      
      toast({
        title: "Summary ready!",
        description: "Your text has been summarized successfully.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="container py-6 flex-1">
        <AccessibilitySettings 
          isDyslexicFont={isDyslexicFont}
          setIsDyslexicFont={setIsDyslexicFont}
          letterSpacing={letterSpacing}
          setLetterSpacing={setLetterSpacing}
          fontType={fontType as any}
          setFontType={setFontType as any}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TextReader 
            isDyslexicFont={isDyslexicFont}
            letterSpacing={letterSpacing}
            fontType={fontType}
          />
          
          <ChatAssistantPanel 
            isDyslexicFont={isDyslexicFont}
            letterSpacing={letterSpacing}
            fontType={fontType}
          />
        </div>
        
        <TextProcessingPanel 
          isDyslexicFont={isDyslexicFont}
          letterSpacing={letterSpacing}
          fontType={fontType}
          startReading={startReading}
          summarizeText={summarizeText}
          text={text}
          setText={setText}
          processedText={processedText}
          isProcessing={isProcessing}
        />
        
        <GrammarCorrectionPanel 
          isDyslexicFont={isDyslexicFont}
          letterSpacing={letterSpacing}
          fontType={fontType}
        />
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} TextEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
