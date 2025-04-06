
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Lightbulb, 
  CheckCircle,
  List,
  FileText,
  Volume2,
  Brain,
  GraduationCap,
  Eye
} from "lucide-react";

const ReadingTools = () => {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <span>Reading Tools</span>
          <span className="text-accent text-sm">💡</span>
        </CardTitle>
        <CardDescription>
          Tools and tips to help you read and understand text better
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="features">
          <TabsList className="mb-4">
            <TabsTrigger value="features" className="flex items-center gap-1">
              <List className="h-4 w-4" /> Features
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-1">
              <GraduationCap className="h-4 w-4" /> Reading Tips
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Text Processing 📄
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Paste or upload text for processing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Easily adjust font size and spacing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>OpenDyslexic font for better readability</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-purple-500" />
                    Text-to-Speech 🔊
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Listen to your text being read aloud</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Adjust speed and pitch of the voice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Pause, resume or stop at any time</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Brain className="h-4 w-4 text-blue-500" />
                    Summarization 📝
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Get quick summaries of long texts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Focus on key points and main ideas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Save time understanding complex documents</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Eye className="h-4 w-4 text-orange-500" />
                    Language Tools 🌐
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Convert between Hinglish and English</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Get spelling corrections for your text</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Improve readability with one click</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex gap-2 items-center">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Reading Tips for Dyslexia 📚
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <p>Use a ruler or bookmark to track your place while reading 📏</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <p>Break reading into smaller chunks of 15-20 minutes ⏱️</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <p>Try colored overlays to reduce visual stress (yellow or blue often works well) 🎨</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <p>Use larger font sizes and increased line spacing 🔎</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <p>Listen to audio while following along with text 🎧</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <p>Read in a quiet environment to minimize distractions 🧘</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <p>Practice summarizing what you've read in your own words 💬</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReadingTools;
