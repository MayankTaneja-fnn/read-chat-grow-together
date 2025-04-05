
import React, { useState, useRef } from "react";
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
  Type 
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const TextReader = () => {
  const [text, setText] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);
  const [fontSize, setFontSize] = useState([16]);
  const [lineSpacing, setLineSpacing] = useState([1.8]);
  const [letterSpacing, setLetterSpacing] = useState([0.025]);
  const [summary, setSummary] = useState("");
  const synth = useRef(window.speechSynthesis);
  const speechUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

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
    speechUtterance.current.onend = () => setIsReading(false);
    synth.current.speak(speechUtterance.current);
    setIsReading(true);
  };

  const pauseReading = () => {
    if (isReading) {
      synth.current.pause();
    } else {
      synth.current.resume();
    }
    setIsReading(!isReading);
  };

  const stopReading = () => {
    synth.current.cancel();
    setIsReading(false);
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

    // In a real application, this would call an API
    // For now, we'll simulate a summary with a timeout
    toast({
      title: "Summarizing text...",
      description: "Please wait while we process your text.",
    });

    setTimeout(() => {
      // Simple summarization logic (for demo purposes)
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      let simpleSummary = "";
      
      if (sentences.length <= 3) {
        simpleSummary = text;
      } else {
        // Take the first sentence and a couple more from the text
        simpleSummary = sentences.slice(0, 3).join(" ");
        
        if (sentences.length > 5) {
          // Add another sentence from later in the text
          simpleSummary += " [...] " + sentences[sentences.length - 2];
        }
      }
      
      setSummary(simpleSummary);
      toast({
        title: "Summary ready!",
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
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="text-input">Enter or paste text</Label>
          <Textarea
            id="text-input"
            placeholder="Enter or paste text here..."
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
            <Play className="h-4 w-4" /> Read
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
            <AlignJustify className="h-4 w-4" /> Summarize
          </Button>
        </div>

        <div className="mb-6 space-y-4 border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <span className="font-medium">Reading Settings</span>
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
        </div>

        <Tabs defaultValue="preview">
          <TabsList className="mb-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="h-[200px] overflow-y-auto border rounded-lg p-4">
            {text ? (
              <div className={`${fontClass} reading-friendly`} style={readingStyles}>
                {text}
              </div>
            ) : (
              <div className="text-muted-foreground flex items-center justify-center h-full">
                <p>Your text preview will appear here</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="summary" className="h-[200px] overflow-y-auto border rounded-lg p-4">
            {summary ? (
              <div className={`${fontClass} reading-friendly`} style={readingStyles}>
                {summary}
              </div>
            ) : (
              <div className="text-muted-foreground flex items-center justify-center h-full">
                <p>Text summary will appear here after summarization</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TextReader;
