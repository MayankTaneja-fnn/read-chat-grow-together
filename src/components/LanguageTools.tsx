
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Languages, 
  Sparkles, 
  Pencil, 
  ArrowRightLeft, 
  Check,
  RotateCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LanguageTools = () => {
  const [text, setText] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const [conversionType, setConversionType] = useState("hinglishToEnglish");
  const [correctedText, setCorrectedText] = useState("");
  const { toast } = useToast();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleHinglishConversion = () => {
    if (text.trim() === "") {
      toast({
        title: "No text to convert",
        description: "Please enter some text first",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would call an API
    // For now, we'll simulate the conversion with a timeout
    toast({
      title: "Converting text...",
      description: "Please wait while we process your text.",
    });

    setTimeout(() => {
      // Simple mock conversion (for demo purposes)
      let result = "";
      
      if (conversionType === "hinglishToEnglish") {
        // Mock Hinglish to English conversion
        const hinglishToEnglishMap: Record<string, string> = {
          "kya": "what",
          "hai": "is",
          "aap": "you",
          "kaise": "how",
          "ho": "are",
          "main": "I",
          "hoon": "am",
          "theek": "fine",
          "dhanyavaad": "thank you"
        };
        
        result = text.split(" ")
          .map(word => hinglishToEnglishMap[word.toLowerCase()] || word)
          .join(" ");
      } else {
        // Mock English to Hinglish conversion
        const englishToHinglishMap: Record<string, string> = {
          "what": "kya",
          "is": "hai",
          "you": "aap",
          "how": "kaise",
          "are": "ho",
          "i": "main",
          "am": "hoon",
          "fine": "theek",
          "thank": "dhanyavaad",
        };
        
        result = text.split(" ")
          .map(word => englishToHinglishMap[word.toLowerCase()] || word)
          .join(" ");
      }
      
      setConvertedText(result);
      toast({
        title: "Conversion complete!",
        description: "Your text has been converted.",
      });
    }, 1000);
  };

  const handleSpellingCorrection = () => {
    if (text.trim() === "") {
      toast({
        title: "No text to correct",
        description: "Please enter some text first",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would call an API
    // For now, we'll simulate the correction with common misspellings
    toast({
      title: "Checking spelling...",
      description: "Please wait while we process your text.",
    });

    setTimeout(() => {
      // Simple mock spelling correction (for demo purposes)
      const misspellings: Record<string, string> = {
        "teh": "the",
        "recieve": "receive",
        "freind": "friend",
        "beleive": "believe",
        "thier": "their",
        "alot": "a lot",
        "definately": "definitely",
        "seperate": "separate",
        "occured": "occurred",
        "untill": "until"
      };
      
      const corrected = text.split(" ")
        .map(word => misspellings[word.toLowerCase()] || word)
        .join(" ");
      
      setCorrectedText(corrected);
      toast({
        title: "Spelling check complete!",
        description: "Your text has been checked and corrected.",
      });
    }, 1200);
  };

  const resetFields = (tab: string) => {
    if (tab === "conversion") {
      setConvertedText("");
    } else if (tab === "spelling") {
      setCorrectedText("");
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="h-5 w-5 text-blue-500" />
          <span>Language Tools</span> 
          <span className="text-accent text-sm">✨</span>
        </CardTitle>
        <CardDescription>
          Convert between languages and fix spelling mistakes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="conversion" onValueChange={(tab) => resetFields(tab)}>
          <TabsList className="mb-4">
            <TabsTrigger value="conversion">
              <ArrowRightLeft className="h-4 w-4 mr-2" /> 
              Language Conversion
            </TabsTrigger>
            <TabsTrigger value="spelling">
              <Pencil className="h-4 w-4 mr-2" /> 
              Spelling Correction
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="conversion">
            <div className="space-y-4">
              <div>
                <Label htmlFor="conversion-text">Enter text to convert</Label>
                <Textarea
                  id="conversion-text"
                  placeholder="Type or paste text here..."
                  value={text}
                  onChange={handleTextChange}
                  className="min-h-[100px]"
                />
              </div>
              
              <RadioGroup 
                value={conversionType} 
                onValueChange={setConversionType}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hinglishToEnglish" id="hinglish-to-english" />
                  <Label htmlFor="hinglish-to-english">Hinglish → English 🇮🇳→🇬🇧</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="englishToHinglish" id="english-to-hinglish" />
                  <Label htmlFor="english-to-hinglish">English → Hinglish 🇬🇧→🇮🇳</Label>
                </div>
              </RadioGroup>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleHinglishConversion}
                  className="flex gap-1"
                  disabled={text.trim() === ""}
                >
                  <Sparkles className="h-4 w-4" /> 
                  Convert Text
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setConvertedText("")}
                  disabled={!convertedText}
                  className="flex gap-1"
                >
                  <RotateCcw className="h-4 w-4" /> 
                  Reset
                </Button>
              </div>
              
              {convertedText && (
                <div className="mt-4 border rounded-lg p-4 bg-secondary/30">
                  <p className="text-sm font-medium mb-2">Converted Text:</p>
                  <p className="font-dyslexic">{convertedText}</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="spelling">
            <div className="space-y-4">
              <div>
                <Label htmlFor="spelling-text">Enter text to check spelling</Label>
                <Textarea
                  id="spelling-text"
                  placeholder="Type or paste text here..."
                  value={text}
                  onChange={handleTextChange}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleSpellingCorrection}
                  className="flex gap-1"
                  disabled={text.trim() === ""}
                >
                  <Check className="h-4 w-4" /> 
                  Check Spelling
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setCorrectedText("")}
                  disabled={!correctedText}
                  className="flex gap-1"
                >
                  <RotateCcw className="h-4 w-4" /> 
                  Reset
                </Button>
              </div>
              
              {correctedText && (
                <div className="mt-4 border rounded-lg p-4 bg-secondary/30">
                  <p className="text-sm font-medium mb-2">Corrected Text:</p>
                  <p className="font-dyslexic">{correctedText}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LanguageTools;
