
import React from "react";
import { Book, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../assets/textease-logo.png";

const NavBar = () => {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-md w-12 h-12 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 rounded-sm"></div>
          </div>
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-400">TextEase</h1>
            <span className="text-yellow-500 text-3xl ml-2">✨</span>
          </div>
        </div>
        
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
