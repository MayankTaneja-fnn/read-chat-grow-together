
import React from "react";
import NavBar from "@/components/NavBar";
import TextReader from "@/components/TextReader";
import ChatAssistant from "@/components/ChatAssistant";
import ReadingTools from "@/components/ReadingTools";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="container py-8 flex-1">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">ReadChat</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Making reading and communication accessible for everyone with dyslexia and neurodiversity
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <TextReader />
            <ReadingTools />
          </div>
          <ChatAssistant />
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ReadChat. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            A tool designed to make reading and communication accessible for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
