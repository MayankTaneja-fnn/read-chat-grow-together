
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Play, 
  Pause, 
  VolumeX, 
  RefreshCw, 
  AlignJustify, 
  Type,
  Mic,
  MicOff,
  BrainCircuit,
  ScanText,
  Volume
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const TextReader = () => {
  const [text, setText] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);
  const [fontSize, setFontSize] = useState([16]);
  const [lineSpacing, setLineSpacing] = useState([1.8]);
  const [letterSpacing, setLetterSpacing] = useState([0.025]);
  const [summary, setSummary] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceRate, setVoiceRate] = useState([1]);
  const [voicePitch, setVoicePitch] = useState([1]);
  const synth = useRef(window.speechSynthesis);
  const speechUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript + ' ';
          }
        }
        if (transcript) {
          setText(prev => prev + transcript);
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event);
        setIsListening(false);
        toast({
          title: "Speech recognition error",
          description: "There was an error with speech recognition. Please try again.",
          variant: "destructive",
        });
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechUtterance.current) {
        synth.current.cancel();
      }
    };
  }, [toast]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

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
    speechUtterance.current.rate = voiceRate[0];
    speechUtterance.current.pitch = voicePitch[0];
    speechUtterance.current.onend = () => setIsReading(false);
    synth.current.speak(speechUtterance.current);
    setIsReading(true);
    
    toast({
      title: "Reading started",
      description: "Text is being read aloud. Use the controls to pause or stop.",
    });
  };

  const pauseReading = () => {
    if (isReading) {
      synth.current.pause();
      toast({
        title: "Reading paused",
        description: "Click Resume to continue reading.",
      });
    } else {
      synth.current.resume();
      toast({
        title: "Reading resumed",
        description: "Text-to-speech has resumed.",
      });
    }
    setIsReading(!isReading);
  };

  const stopReading = () => {
    synth.current.cancel();
    setIsReading(false);
    toast({
      title: "Reading stopped",
      description: "Text-to-speech has been stopped.",
    });
  };

  const toggleSpeechToText = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech recognition not available",
        description: "Your browser doesn't support speech recognition. Try Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      toast({
        title: "Speech to text stopped",
        description: "Voice input has been turned off.",
      });
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: "Listening... 🎤",
        description: "Speak clearly. Your speech will be converted to text.",
      });
    }
  };

  const summarizeText = async () => {
    if (text.trim() === "") {
      toast({
        title: "No text to summarize",
        description: "Please enter some text first",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Summarizing text... 🧠",
      description: "Please wait while we process your text.",
    });

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
      
      setSummary(simpleSummary);
      toast({
        title: "Summary ready! 📝",
        description: "Check the Summary tab to see your results.",
      });
    }, 1500);
  };

  const fontClass = isDyslexicFont ? "font-dyslexic" : "font-sans";
  
  const readingStyles = {
    fontSize: `${fontSize[0]}px`,
    lineHeight: `${lineSpacing[0]}`,
    letterSpacing: `${letterSpacing[0]}em`,
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <span>Text Reader & Assistant</span>
          {isListening && <Badge variant="outline" className="animate-pulse bg-red-100 text-red-600 border-red-300">Recording 🎤</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <Label htmlFor="text-input">Enter or paste text</Label>
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleSpeechToText} 
              className={isListening ? "bg-red-100 text-red-600 border-red-300" : ""}
            >
              {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
              {isListening ? "Stop Dictation" : "Dictate Text"} 
            </Button>
          </div>
          <Textarea
            id="text-input"
            placeholder="Enter or paste text here, or click 'Dictate Text' to speak..."
            className="min-h-[150px]"
            value={text}
            onChange={handleTextChange}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            className="flex gap-1"
            onClick={startReading}
            disabled={isReading || text.trim() === ""}
          >
            <Play className="h-4 w-4" /> Read Aloud 🔊
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex gap-1"
            onClick={pauseReading}
            disabled={!speechUtterance.current}
          >
            {isReading ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isReading ? "Pause" : "Resume"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex gap-1"
            onClick={stopReading}
            disabled={!isReading && !speechUtterance.current}
          >
            <VolumeX className="h-4 w-4" /> Stop
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex gap-1"
            onClick={summarizeText}
            disabled={text.trim() === ""}
          >
            <BrainCircuit className="h-4 w-4" /> Summarize 📝
          </Button>
        </div>

        <div className="mb-6 space-y-4 border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <span className="font-medium">Reading Settings</span> 
              <span className="text-xs text-muted-foreground">🖌️ Customize how text appears</span>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="dyslexic-font" className="text-sm cursor-pointer">
                OpenDyslexic Font
              </Label>
              <Switch 
                id="dyslexic-font" 
                checked={isDyslexicFont}
                onCheckedChange={setIsDyslexicFont}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label htmlFor="font-size">Font Size ({fontSize[0]}px)</Label>
                </div>
                <Slider
                  id="font-size"
                  min={14}
                  max={24}
                  step={1}
                  value={fontSize}
                  onValueChange={setFontSize}
                />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label htmlFor="line-spacing">Line Spacing ({lineSpacing[0].toFixed(1)})</Label>
                </div>
                <Slider
                  id="line-spacing"
                  min={1.2}
                  max={2.5}
                  step={0.1}
                  value={lineSpacing}
                  onValueChange={setLineSpacing}
                />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label htmlFor="letter-spacing">Letter Spacing ({letterSpacing[0].toFixed(3)}em)</Label>
                </div>
                <Slider
                  id="letter-spacing"
                  min={0}
                  max={0.1}
                  step={0.005}
                  value={letterSpacing}
                  onValueChange={setLetterSpacing}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Volume className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Voice Settings</span>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label htmlFor="voice-rate">Speed ({voiceRate[0].toFixed(1)}x)</Label>
                </div>
                <Slider
                  id="voice-rate"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={voiceRate}
                  onValueChange={setVoiceRate}
                />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label htmlFor="voice-pitch">Pitch ({voicePitch[0].toFixed(1)})</Label>
                </div>
                <Slider
                  id="voice-pitch"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={voicePitch}
                  onValueChange={setVoicePitch}
                />
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="preview">
          <TabsList className="mb-2">
            <TabsTrigger value="preview">
              <ScanText className="h-4 w-4 mr-1" /> Preview
            </TabsTrigger>
            <TabsTrigger value="summary">
              <BrainCircuit className="h-4 w-4 mr-1" /> Summary
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="h-[200px] overflow-y-auto border rounded-lg p-4">
            {text ? (
              <div className={`${fontClass} reading-friendly`} style={readingStyles}>
                {text}
              </div>
            ) : (
              <div className="text-muted-foreground flex flex-col items-center justify-center h-full">
                <ScanText className="h-8 w-8 mb-2 text-muted-foreground" />
                <p>Your text preview will appear here</p>
                <p className="text-xs mt-1">Type in the box above or use the speech-to-text feature</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="summary" className="h-[200px] overflow-y-auto border rounded-lg p-4">
            {summary ? (
              <div className={`${fontClass} reading-friendly`} style={readingStyles}>
                {summary}
              </div>
            ) : (
              <div className="text-muted-foreground flex flex-col items-center justify-center h-full">
                <BrainCircuit className="h-8 w-8 mb-2 text-muted-foreground" />
                <p>Text summary will appear here after summarization</p>
                <p className="text-xs mt-1">Click the "Summarize" button to generate a summary</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TextReader;
